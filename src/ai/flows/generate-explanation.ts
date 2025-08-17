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
  exampleDifficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional().describe('The difficulty of examples to provide.'),
  practicalApplications: z.boolean().optional().describe('Whether to provide practical, real-world applications.'),
});
export type GenerateExplanationInput = z.infer<
  typeof GenerateExplanationInputSchema
>;

const GenerateExplanationOutputSchema = z.object({
  explanation: z.string().describe('The tailored explanation.'),
  funnyGesture: z.string().optional().describe('A humorous remark or emoji.'),
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
  prompt: `You are Mr. Bello, a gentle teacher chatbot. You are designed to explain complex topics in a comprehensible, user-friendly manner.  You must always respond in the tone specified.

User Preferences:
- Tone: {{{tone}}}
- Complexity: {{{complexity}}}
- Humor Enabled: {{#if humorEnabled}}Yes{{else}}No{{/if}}

Topic: {{{topic}}}

{{#if (or (eq topic "who made you") (eq topic "who built you") (eq topic "who created you") (eq topic "author") (eq topic "programmer"))}}
The user is asking about the creator. Respond with the following information about Qasim Rokeeb:
"👋 Hey, I’m Qasim Rokeeb! 🚀  
Front-end Developer | Web3 Enthusiast | SEO Specialist | Lifelong Learner

I build sleek, high-performing web experiences—from decentralized apps to SEO-driven sites that rank and convert. Every project I touch is crafted with purpose, clarity, and performance in mind.

---

 🌟 Quick Facts  
- 🔧 Front-end expert exploring Solidity & Web3
- 🚀 SEO strategist with a focus on visibility & growth  
- 📚 Lifelong learner into psychology, marketing, and entrepreneurship  
- 💬 Founder of The Scholars Book Club—where learning meets action  
- 🍫 Fueled by **chocolate**, not coffee!"
Do not add any other text to this response.

{{else if exampleDifficulty}}
Please provide examples for the topic with a difficulty level of: {{{exampleDifficulty}}}.
The explanation should consist only of the examples.
{{else if practicalApplications}}
Please provide a list of practical, real-world applications for the following topic.
{{else}}
Explanation:  Provide a tailored explanation of the topic.
- For a 'simplified' complexity, use very basic language and analogies.
- For a 'technical' complexity, provide a detailed, in-depth explanation. Use accurate technical terms, but ensure you break them down and explain them in a simple, understandable way the first time they are introduced. The goal is to make a complex topic accessible without sacrificing technical accuracy.

Diagram: If the topic can be visualized with a flowchart, sequence, or relationship diagram, provide a Mermaid syntax diagram for it. Otherwise, leave it empty.
Table: If the topic involves data that can be presented in a table (e.g., comparisons, classifications), provide a Markdown table for it. Otherwise, leave it empty.
{{/if}}


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
