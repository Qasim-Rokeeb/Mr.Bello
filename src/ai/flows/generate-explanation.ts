'use server';
/**
 * @fileOverview Generates explanations tailored to the user's chosen tone and complexity.
 *
 * - generateExplanation - A function that generates a tailored explanation for a given topic.
 * - GenerateExplanationInput - The input type for the generateExplanation function.
 * - GenerateExplanationOutput - The return type for the generateExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExplanationInputSchema = z.object({
  topic: z.string().describe('The topic to explain.'),
  tone: z
    .string()
    .describe(
      'The tone of the explanation (e.g., Gentle, Encouraging, Formal, Fun).'
    ),
  complexity:
    z.enum(['simplified', 'technical']).describe('The complexity level.'),
  humorEnabled: z.boolean().describe('Whether funny gestures are enabled.'),
});
export type GenerateExplanationInput = z.infer<
  typeof GenerateExplanationInputSchema
>;

const GenerateExplanationOutputSchema = z.object({
  explanation: z.string().describe('The tailored explanation.'),
  funnyGesture: z.string().optional().describe('A humorous remark or emoji.'),
});
export type GenerateExplanationOutput = z.infer<
  typeof GenerateExplanationOutputSchema
>;

export async function generateExplanation(
  input: GenerateExplanationInput
): Promise<GenerateExplanationOutput> {
  return generateExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExplanationPrompt',
  input: {schema: GenerateExplanationInputSchema},
  output: {schema: GenerateExplanationOutputSchema},
  prompt: `You are Mr. Bello, a gentle teacher chatbot. You are designed to explain complex topics in a comprehensible, user-friendly manner.  You must always respond in the tone specified.

User Preferences:
- Tone: {{{tone}}}
- Complexity: {{{complexity}}}
- Humor Enabled: {{#if humorEnabled}}Yes{{else}}No{{/if}}

Topic: {{{topic}}}

Explanation:  Provide a tailored explanation of the topic, considering the user's tone and complexity preferences.  The complexity must affect the level of detail, vocabulary, and depth of the explanation. For simplified, use very basic language.  For technical, assume the user has high level knowledge.

{{#if humorEnabled}}
Funny Gesture: Generate a humorous remark or emoji gesture related to the topic.
{{else}}
Funny Gesture: Do not generate a humorous remark or emoji gesture.
{{/if}}`,
});

const generateExplanationFlow = ai.defineFlow(
  {
    name: 'generateExplanationFlow',
    inputSchema: GenerateExplanationInputSchema,
    outputSchema: GenerateExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
