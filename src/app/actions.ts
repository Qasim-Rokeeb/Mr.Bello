'use server';

import { courseTopicBreakdown } from '@/ai/flows/breakdown-course';
import { generateExplanation } from '@/ai/flows/generate-explanation';
import type { Complexity, Tone, LearningMode } from '@/lib/types';

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
  refinement?: 'examples' | 'resources';
}

export async function handleExplanation({ topic, tone, complexity, humorEnabled, refinement }: ExplanationParams): Promise<ActionResponse> {
  try {
    let finalTopic = topic;
    if (refinement === 'examples') {
      finalTopic = `Provide practical and relatable examples for: ${topic}`;
    } else if (refinement === 'resources') {
      finalTopic = `Provide a list of credible external online resources for: ${topic}`;
    }
    
    const result = await generateExplanation({ 
      topic: finalTopic, 
      tone, 
      complexity, 
      humorEnabled 
    });
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating explanation:', error);
    return { success: false, error: 'Failed to generate explanation. Please try again.' };
  }
}
