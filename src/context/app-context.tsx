'use client';

import React, { createContext, useState, useCallback, ReactNode } from 'react';
import type { Settings, Message, Tone, Complexity, LearningMode, ExampleDifficulty } from '@/lib/types';
import { handleCourseBreakdown, handleExplanation } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { id } from '@/lib/utils';

interface AppContextType {
  settings: Settings;
  messages: Message[];
  isConfigured: boolean;
  isLoading: boolean;
  saveSettings: (settings: Settings) => void;
  sendMessage: (content: string, mode: LearningMode) => Promise<void>;
  refineExplanation: (topic: string, refinement: 'simplify' | 'technical' | 'examples' | 'resources') => Promise<void>;
  startTopicFromCourse: (topic: string) => Promise<void>;
  getNextExampleDifficulty: () => ExampleDifficulty;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

const exampleDifficulties: ExampleDifficulty[] = ['beginner', 'intermediate', 'advanced'];

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
  const [currentExampleDifficultyIndex, setCurrentExampleDifficultyIndex] = useState(0);

  const getNextExampleDifficulty = () => {
    return exampleDifficulties[currentExampleDifficultyIndex];
  };

  const saveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    setIsConfigured(true);
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

  const refineExplanation = async (topic: string, refinement: 'simplify' | 'technical' | 'examples' | 'resources') => {
    if (isLoading) return;
    
    let complexity: Complexity = 'simplified';
    let refinementType: 'resources' | undefined = undefined;
    let exampleDifficulty: ExampleDifficulty | undefined = undefined;
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
        exampleDifficulty = getNextExampleDifficulty();
        userMessageContent = `Can you give me some ${exampleDifficulty} examples for "${topic}"?`;
        setCurrentExampleDifficultyIndex((prevIndex) => (prevIndex + 1) % exampleDifficulties.length);
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
        exampleDifficulty: exampleDifficulty,
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
         if (refinement === 'examples') {
          setCurrentExampleDifficultyIndex((prevIndex) => (prevIndex - 1 + exampleDifficulties.length) % exampleDifficulties.length);
        }
      }
    } catch(e) {
        handleError('An unexpected error occurred during refinement.');
         if (refinement === 'examples') {
          setCurrentExampleDifficultyIndex((prevIndex) => (prevIndex - 1 + exampleDifficulties.length) % exampleDifficulties.length);
        }
    } finally {
        setIsLoading(false);
    }
  };

  const startTopicFromCourse = async (topic: string) => {
    if (isLoading) return;
    setCurrentExampleDifficultyIndex(0);
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

  return (
    <AppContext.Provider value={{ settings, messages, isConfigured, isLoading, saveSettings, sendMessage, refineExplanation, startTopicFromCourse, getNextExampleDifficulty }}>
      {children}
    </AppContext.Provider>
  );
};
