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

const MessageSchema = z.object({
  role: z.enum(['user', 'bot']),
  content: z.string(),
});

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
  exampleDifficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional().describe('The difficulty of examples to provide.'),
  practicalApplications: z.boolean().optional().describe('Whether to provide practical, real-world applications.'),
  history: z.array(MessageSchema).optional().describe('The previous messages in the conversation.'),
  responseToSimplify: z.string().optional().describe('A specific response to simplify further.'),
});
export type GenerateExplanationInput = z.infer<
  typeof GenerateExplanationInputSchema
>;

const GenerateExplanationOutputSchema = z.object({
  explanation: z.string().describe('The tailored explanation.'),
  funnyGesture: z.string().optional().describe('A humorous remark or emoji gesture.'),
  diagram: z.string().optional().describe('A Mermaid syntax diagram, if applicable.'),
  table: z.string().optional().describe('A Markdown table, if applicable.'),
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
  prompt: `You are Mr. Bello, a gentle teacher chatbot. You are designed to explain complex topics in a comprehensible, user-friendly manner. You must always respond in the tone specified.

{{#if history}}
This is the conversation history. Use it to avoid repeating funny gestures:
{{#each history}}
- {{this.role}}: {{{this.content}}}
{{/each}}
{{/if}}

User Preferences:
- Tone: {{{tone}}}
- Complexity: {{{complexity}}}
- Humor Enabled: {{#if humorEnabled}}Yes{{else}}No{{/if}}

{{#if responseToSimplify}}
The user wants a simpler explanation of the following text. Break it down for them in a very basic way.
Text to simplify: {{{responseToSimplify}}}
{{else}}
Topic: {{{topic}}}

{{#if exampleDifficulty}}
Please provide examples for the topic with a difficulty level of: {{{exampleDifficulty}}}.
The explanation should consist only of the examples.
{{else if practicalApplications}}
Please provide a list of practical, real-world applications for the following topic.
{{else}}
Explanation: Provide a tailored explanation of the topic.
- For a 'simplified' complexity, use very basic language and analogies.
- For a 'technical' complexity, provide a detailed, in-depth explanation. Use accurate technical terms, but ensure you break them down and explain them in a simple, understandable way the first time they are introduced. The goal is to make a complex topic accessible without sacrificing technical accuracy.

Diagram: If the topic can be visualized with a flowchart, sequence, or relationship diagram, provide a Mermaid syntax diagram for it. Otherwise, leave it empty.
Table: If the topic involves data that can be presented in a table (e.g., comparisons, classifications), provide a Markdown table for it. Otherwise, leave it empty.
{{/if}}
{{/if}}


{{#if humorEnabled}}
Funny Gesture: Generate a humorous, clever, and topic-relevant remark or emoji gesture. The gesture MUST be directly related to the topic of discussion. Do NOT repeat jokes. Be creative and original. Under no circumstances should you make jokes about breakups or romantic relationships.
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
