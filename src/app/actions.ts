'use server';

import { courseTopicBreakdown } from '@/ai/flows/breakdown-course';
import { generateExplanation } from '@/ai/flows/generate-explanation';
import { generateQuiz } from '@/ai/flows/generate-quiz';
import type { Complexity, Tone, ExampleDifficulty, Message } from '@/lib/types';

interface ActionResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export async function handleCourseBreakdown(courseName: string): Promise<ActionResponse> {
  try {
    const result = await courseTopicBreakdown({ courseName });
    return { success: true, data: result.topics };
  } catch (error) {
    console.error('Error in course breakdown:', error);
    return { success: false, error: 'Failed to break down the course. Please try again.' };
  }
}

interface ExplanationParams {
  topic: string;
  tone: Tone;
  complexity: Complexity;
  humorEnabled: boolean;
  history?: Message[];
  refinement?: 'resources' | 'applications';
  exampleDifficulty?: ExampleDifficulty;
  responseToSimplify?: string;
}

export async function handleExplanation({ topic, tone, complexity, humorEnabled, history, refinement, exampleDifficulty, responseToSimplify }: ExplanationParams): Promise<ActionResponse> {
  try {
    let finalTopic = topic;
    let practicalApplications = false;
    if (refinement === 'resources') {
      finalTopic = `Provide a list of credible external online resources for: ${topic}. This list should include YouTube videos, articles, and PDFs. You must also research and include the most recommended or popular book on this topic.`;
    }
    if (refinement === 'applications') {
      practicalApplications = true;
    }
    
    const result = await generateExplanation({ 
      topic: finalTopic, 
      tone, 
      complexity, 
      humorEnabled,
      history: history?.map(m => ({ role: m.role, content: m.content })),
      exampleDifficulty,
      practicalApplications,
      responseToSimplify,
    });
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating explanation:', error);
    return { success: false, error: 'Failed to generate explanation. Please try again.' };
  }
}

export async function handleQuizGeneration(topic: string): Promise<ActionResponse> {
  try {
    const result = await generateQuiz({ topic });
    return { success: true, data: result.questions };
  } catch (error) {
    console.error('Error generating quiz:', error);
    return { success: false, error: 'Failed to generate the quiz. Please try again.' };
  }
}
