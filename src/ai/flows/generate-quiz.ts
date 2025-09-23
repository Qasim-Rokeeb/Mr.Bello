
'use server';
/**
 * @fileOverview Generates a quiz for a given topic.
 *
 * - generateQuiz - A function that generates a quiz.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuestionSchema = z.object({
  questionText: z.string().describe('The text of the quiz question.'),
  options: z.array(z.string()).describe('A list of possible answers for the question.'),
  correctAnswer: z.string().describe('The correct answer from the options.'),
  explanation: z.string().describe('A brief explanation for the correct answer.'),
});

const GenerateQuizInputSchema = z.object({
  topic: z.string().describe('The topic to generate a quiz for.'),
  numQuestions: z.number().optional().default(3).describe('The number of questions to generate.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const GenerateQuizOutputSchema = z.object({
  questions: z.array(QuestionSchema).describe('A list of quiz questions.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;


export async function generateQuiz(
  input: GenerateQuizInput
): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `You are an expert educator. Create a multiple-choice quiz with {{numQuestions}} questions for the following topic. Each question should have 4 options. Ensure you provide the correct answer and a brief explanation for why it's correct.

Topic: {{{topic}}}
`,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
