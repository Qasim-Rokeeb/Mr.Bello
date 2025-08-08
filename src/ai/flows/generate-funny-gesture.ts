'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating humorous remarks or emoji gestures.
 *
 * The flow takes a topic as input and returns a humorous remark or emoji related to the topic.
 * This is used to add a playful element to learning, as requested by the user story.
 *
 * @exports generateFunnyGesture - The main function to generate funny gestures.
 * @exports GenerateFunnyGestureInput - The input type for the generateFunnyGesture function.
 * @exports GenerateFunnyGestureOutput - The output type for the generateFunnyGesture function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFunnyGestureInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate a humorous remark.'),
});

export type GenerateFunnyGestureInput = z.infer<
  typeof GenerateFunnyGestureInputSchema
>;

const GenerateFunnyGestureOutputSchema = z.object({
  gesture: z.string().describe('A humorous remark or emoji gesture related to the topic.'),
});

export type GenerateFunnyGestureOutput = z.infer<
  typeof GenerateFunnyGestureOutputSchema
>;

export async function generateFunnyGesture(
  input: GenerateFunnyGestureInput
): Promise<GenerateFunnyGestureOutput> {
  return generateFunnyGestureFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFunnyGesturePrompt',
  input: {schema: GenerateFunnyGestureInputSchema},
  output: {schema: GenerateFunnyGestureOutputSchema},
  prompt: `You are a chatbot designed to provide funny gestures related to a topic. The gesture should be short, funny, and related to the topic.

Topic: {{{topic}}}

Gesture:`,
});

const generateFunnyGestureFlow = ai.defineFlow(
  {
    name: 'generateFunnyGestureFlow',
    inputSchema: GenerateFunnyGestureInputSchema,
    outputSchema: GenerateFunnyGestureOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
