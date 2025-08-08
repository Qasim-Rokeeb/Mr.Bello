'use client';

import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import type { Settings, Message, Tone, Complexity, LearningMode, ExampleDifficulty } from '@/lib/types';
import { handleCourseBreakdown, handleExplanation } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { id } from '@/lib/utils';

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
}

interface AppContextType {
  settings: Settings;
  messages: Message[];
  isConfigured: boolean;
  isLoading: boolean;
  history: ChatSession[];
  currentSessionId: string | null;
  saveSettings: (settings: Settings) => void;
  sendMessage: (content: string, mode: LearningMode) => Promise<void>;
  refineExplanation: (topic: string, refinement: 'simplify' | 'technical' | 'examples' | 'resources', exampleDifficulty?: ExampleDifficulty) => Promise<void>;
  startTopicFromCourse: (topic: string) => Promise<void>;
  startNewChat: (fromSettings?: Settings) => void;
  loadChat: (sessionId: string) => void;
  clearHistory: () => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);


export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Settings>({
    name: '',
    tone: 'Gentle',
    humor: true,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConfigured, setIsConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('bello-history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
      const storedSettings = localStorage.getItem('bello-settings');
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        setSettings(parsedSettings);
        setIsConfigured(true);
      }
    } catch (error) {
      console.error("Failed to load from local storage", error);
    }
  }, []);

  useEffect(() => {
    if(isConfigured && messages.length > 0) {
      if(currentSessionId) {
        const updatedHistory = history.map(session => 
          session.id === currentSessionId ? { ...session, messages, timestamp: Date.now() } : session
        );
        const sessionExists = updatedHistory.some(s => s.id === currentSessionId);
        if(!sessionExists) {
            updatedHistory.push({
              id: currentSessionId,
              title: messages.find(m => m.role === 'user')?.content.substring(0, 30) || 'New Chat',
              messages,
              timestamp: Date.now(),
            })
        }
        setHistory(updatedHistory);
        localStorage.setItem('bello-history', JSON.stringify(updatedHistory));
      }
    }
  }, [messages, currentSessionId, history, isConfigured]);
  
  const startNewChat = useCallback((fromSettings?: Settings) => {
    const newId = `session-${Date.now()}`;
    const newName = fromSettings?.name || settings.name;
    setCurrentSessionId(newId);
    setMessages([
        { id: id(), role: 'bot', content: `Hello ${newName}! I'm Mr. Bello. How can I help you learn today? You can ask me to explain a topic or break down a course.` }
    ]);
  }, [settings.name]);

  const saveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    setIsConfigured(true);
    localStorage.setItem('bello-settings', JSON.stringify(newSettings));
    startNewChat(newSettings);
  };

  const loadChat = (sessionId: string) => {
    const session = history.find(s => s.id === sessionId);
    if(session) {
      setCurrentSessionId(sessionId);
      setMessages(session.messages);
    }
  };

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('bello-history');
    startNewChat();
  }, [startNewChat]);

  const handleError = (errorMessage: string) => {
    toast({
      variant: 'destructive',
      title: 'An error occurred',
      description: errorMessage,
    });
  };

  const processResponse = useCallback(async (content: string, mode: LearningMode) => {
    if (mode === 'course') {
      const response = await handleCourseBreakdown(content);
      if (response.success) {
        setMessages(prev => [...prev, {
          id: id(),
          role: 'bot',
          content: `Here are the topics for the course "${content}":`,
          courseTopics: response.data,
        }]);
      } else {
        handleError(response.error || 'Unknown error');
      }
    } else {
      const response = await handleExplanation({
        topic: content,
        tone: settings.tone,
        complexity: 'simplified',
        humorEnabled: settings.humor,
      });
      if (response.success) {
        setMessages(prev => [...prev, {
          id: id(),
          role: 'bot',
          topic: content,
          content: response.data.explanation,
          funnyGesture: response.data.funnyGesture,
          diagram: response.data.diagram,
          table: response.data.table,
        }]);
      } else {
        handleError(response.error || 'Unknown error');
      }
    }
  }, [settings.tone, settings.humor]);

  const sendMessage = async (content: string, mode: LearningMode) => {
    if (isLoading || !content.trim()) return;

    if (!currentSessionId) {
      startNewChat();
    }

    const userMessage: Message = { id: id(), role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      await processResponse(content, mode);
    } catch (e) {
      handleError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const refineExplanation = async (topic: string, refinement: 'simplify' | 'technical' | 'examples' | 'resources', exampleDifficulty?: ExampleDifficulty) => {
    if (isLoading) return;
    
    let complexity: Complexity = 'simplified';
    let refinementType: 'resources' | undefined = undefined;
    let finalExampleDifficulty: ExampleDifficulty | undefined = exampleDifficulty;
    let userMessageContent = '';
    
    if (refinement === 'simplify') {
        complexity = 'simplified';
        userMessageContent = `Can you give me a simplified explanation for "${topic}"?`;
    } else if (refinement === 'technical') {
        complexity = 'technical';
        userMessageContent = `Can you give me a more technical explanation for "${topic}"?`;
    } else if (refinement === 'resources') {
        refinementType = 'resources';
        userMessageContent = `Can you give me some resources for "${topic}"?`;
    } else if (refinement === 'examples') {
        userMessageContent = `Can you give me some ${finalExampleDifficulty} examples for "${topic}"?`;
    }

    const userMessage: Message = { id: id(), role: 'user', content: userMessageContent };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
       const response = await handleExplanation({
        topic: topic,
        tone: settings.tone,
        complexity: complexity,
        humorEnabled: settings.humor,
        refinement: refinementType,
        exampleDifficulty: finalExampleDifficulty,
      });

      if (response.success) {
        setMessages(prev => [...prev, {
          id: id(),
          role: 'bot',
          topic: topic,
          content: response.data.explanation,
          funnyGesture: response.data.funnyGesture,
          diagram: response.data.diagram,
          table: response.data.table,
        }]);
      } else {
        handleError(response.error || 'Unknown error');
      }
    } catch(e) {
        handleError('An unexpected error occurred during refinement.');
    } finally {
        setIsLoading(false);
    }
  };

  const startTopicFromCourse = async (topic: string) => {
    if (isLoading) return;

    if (!currentSessionId) {
      startNewChat();
    }
    
    const userMessage: Message = { id: id(), role: 'user', content: `Please explain: ${topic}` };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await handleExplanation({
        topic: topic,
        tone: settings.tone,
        complexity: 'simplified',
        humorEnabled: settings.humor,
      });

      if (response.success) {
        setMessages(prev => [...prev, {
          id: id(),
          role: 'bot',
          topic: topic,
          content: response.data.explanation,
          funnyGesture: response.data.funnyGesture,
          diagram: response.data.diagram,
          table: response.data.table,
        }]);
      } else {
        handleError(response.error || 'Unknown error');
      }
    } catch (e) {
      handleError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = {
    settings,
    messages,
    isConfigured,
    isLoading,
    history,
    currentSessionId,
    saveSettings,
    sendMessage,
    refineExplanation,
    startTopicFromCourse,
    startNewChat,
    loadChat,
    clearHistory
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
