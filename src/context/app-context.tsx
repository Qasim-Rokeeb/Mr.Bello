'use client';

import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import type { Settings, Message, Tone, Complexity, LearningMode, ExampleDifficulty, Course } from '@/lib/types';
import { handleCourseBreakdown, handleExplanation, handleQuizGeneration } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { id } from '@/lib/utils';

interface AppContextType {
  settings: Settings;
  messages: Message[];
  isConfigured: boolean;
  isLoading: boolean;
  name: string;
  activeCourse: Course | null;
  saveSettings: (settings: Settings) => void;
  sendMessage: (content: string, mode: LearningMode) => Promise<void>;
  refineExplanation: (topic: string, refinement: 'simplify' | 'technical' | 'examples' | 'resources' | 'applications', exampleDifficulty?: ExampleDifficulty) => Promise<void>;
  simplifyResponse: (topic: string, responseToSimplify: string) => Promise<void>;
  generateQuiz: (topic: string) => Promise<void>;
  startTopicFromCourse: (topic: string) => Promise<void>;
  startNewChat: () => void;
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
  const [name, setName] = useState('');
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem('bello-settings');
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        setSettings(parsedSettings);
        setName(parsedSettings.name);
        setIsConfigured(true);
        setMessages([
            { id: id(), role: 'bot', content: `Hello ${parsedSettings.name}! I'm Mr. Bello. How can I help you learn today? You can ask me to explain a topic or break down a course.` }
        ]);
      }
    } catch (error) {
      console.error("Failed to load from local storage", error);
    }
  }, []);

  const startNewChat = useCallback(() => {
    setMessages([
        { id: id(), role: 'bot', content: `Hello ${settings.name}! I'm Mr. Bello. How can I help you learn today? You can ask me to explain a topic or break down a course.` }
    ]);
    setActiveCourse(null);
  }, [settings.name]);

  const saveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    setName(newSettings.name);
    setIsConfigured(true);
    localStorage.setItem('bello-settings', JSON.stringify(newSettings));
    setMessages([
        { id: id(), role: 'bot', content: `Hello ${newSettings.name}! I'm Mr. Bello. How can I help you learn today? You can ask me to explain a topic or break down a course.` }
    ]);
  };

  const handleError = (errorMessage: string) => {
    toast({
      variant: 'destructive',
      title: 'An error occurred',
      description: errorMessage,
    });
  };

  const processResponse = useCallback(async (content: string, mode: LearningMode, currentMessages: Message[]) => {
    if (mode === 'course') {
      const response = await handleCourseBreakdown(content);
      if (response.success) {
        const topics = response.data.map((topic: string) => ({ title: topic, completed: false }));
        setActiveCourse({ name: content, topics });
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
        history: currentMessages,
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

    const userMessage: Message = { id: id(), role: 'user', content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      if (mode === 'course') setActiveCourse(null);
      await processResponse(content, mode, newMessages);
    } catch (e) {
      handleError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const refineExplanation = async (topic: string, refinement: 'simplify' | 'technical' | 'examples' | 'resources' | 'applications', exampleDifficulty?: ExampleDifficulty) => {
    if (isLoading) return;
    
    let complexity: Complexity = 'simplified';
    let refinementType: 'resources' | 'applications' | undefined = undefined;
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
    } else if (refinement === 'applications') {
        refinementType = 'applications';
        userMessageContent = `Can you give me some practical applications for "${topic}"?`;
    } else if (refinement === 'examples') {
        userMessageContent = `Can you give me some ${finalExampleDifficulty} examples for "${topic}"?`;
    }

    const userMessage: Message = { id: id(), role: 'user', content: userMessageContent };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
       const response = await handleExplanation({
        topic: topic,
        tone: settings.tone,
        complexity: complexity,
        humorEnabled: settings.humor,
        refinement: refinementType,
        exampleDifficulty: finalExampleDifficulty,
        history: newMessages,
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

  const simplifyResponse = async (topic: string, responseToSimplify: string) => {
    if (isLoading) return;

    const userMessageContent = `Can you explain this response in a simpler way?`;
    const userMessage: Message = { id: id(), role: 'user', content: userMessageContent };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await handleExplanation({
        topic: topic,
        tone: settings.tone,
        complexity: 'simplified',
        humorEnabled: settings.humor,
        history: newMessages,
        responseToSimplify: responseToSimplify,
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

  const generateQuiz = async (topic: string) => {
    if (isLoading) return;
    
    const userMessage: Message = { id: id(), role: 'user', content: `Quiz me on "${topic}"` };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await handleQuizGeneration(topic);

      if (response.success) {
        setMessages(prev => [...prev, {
          id: id(),
          role: 'bot',
          content: `Here is a quiz for you on "${topic}". Good luck!`,
          quizQuestions: response.data,
        }]);
      } else {
        handleError(response.error || 'Unknown error');
      }
    } catch (e) {
      handleError('An unexpected error occurred while generating the quiz.');
    } finally {
      setIsLoading(false);
    }
  }

  const startTopicFromCourse = async (topic: string) => {
    if (isLoading) return;
    
    const userMessage: Message = { id: id(), role: 'user', content: `Please explain: ${topic}` };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await handleExplanation({
        topic: topic,
        tone: settings.tone,
        complexity: 'simplified',
        humorEnabled: settings.humor,
        history: newMessages,
      });

      if (response.success) {
         if (activeCourse) {
            const updatedTopics = activeCourse.topics.map(t =>
                t.title === topic ? { ...t, completed: true } : t
            );
            setActiveCourse({ ...activeCourse, topics: updatedTopics });
        }
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
    name,
    activeCourse,
    saveSettings,
    sendMessage,
    refineExplanation,
    simplifyResponse,
    generateQuiz,
    startTopicFromCourse,
    startNewChat,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
