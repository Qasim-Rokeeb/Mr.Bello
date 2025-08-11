'use server';

import { courseTopicBreakdown } from '@/ai/flows/breakdown-course';
import { generateExplanation } from '@/ai/flows/generate-explanation';
import type { Complexity, Tone, ExampleDifficulty } from '@/lib/types';

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
  refinement?: 'resources' | 'applications';
  exampleDifficulty?: ExampleDifficulty;
}

export async function handleExplanation({ topic, tone, complexity, humorEnabled, refinement, exampleDifficulty }: ExplanationParams): Promise<ActionResponse> {
  try {
    let finalTopic = topic;
    let practicalApplications = false;
    if (refinement === 'resources') {
      finalTopic = `Provide a list of credible external online resources, including YouTube videos and PDFs, for: ${topic}`;
    }
    if (refinement === 'applications') {
      practicalApplications = true;
    }
    
    const result = await generateExplanation({ 
      topic: finalTopic, 
      tone, 
      complexity, 
      humorEnabled,
      exampleDifficulty,
      practicalApplications,
    });
    
    return { success: true, data: result };
  } catch (error) {
    console.error('Error generating explanation:', error);
    return { success: false, error: 'Failed to generate explanation. Please try again.' };
  }
}
