'use server';

/**
 * @fileOverview Provides functionality to break down a course into its constituent topics or modules.
 *
 * - courseTopicBreakdown - A function that breaks down a course into topics.
 * - CourseTopicBreakdownInput - The input type for the courseTopicBreakdown function.
 * - CourseTopicBreakdownOutput - The return type for the courseTopicBreakdown function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CourseTopicBreakdownInputSchema = z.object({
  courseName: z.string().describe('The name of the course to break down into topics.'),
});
export type CourseTopicBreakdownInput = z.infer<typeof CourseTopicBreakdownInputSchema>;

const CourseTopicBreakdownOutputSchema = z.object({
  topics: z.array(z.string()).describe('A list of topics or modules in the course.'),
});
export type CourseTopicBreakdownOutput = z.infer<typeof CourseTopicBreakdownOutputSchema>;

export async function courseTopicBreakdown(input: CourseTopicBreakdownInput): Promise<CourseTopicBreakdownOutput> {
  return courseTopicBreakdownFlow(input);
}

const prompt = ai.definePrompt({
  name: 'courseTopicBreakdownPrompt',
  input: {schema: CourseTopicBreakdownInputSchema},
  output: {schema: CourseTopicBreakdownOutputSchema},
  prompt: `You are an expert educator. Please break down the following course into a list of topics or modules:

Course Name: {{{courseName}}}

Topics:`,
});

const courseTopicBreakdownFlow = ai.defineFlow(
  {
    name: 'courseTopicBreakdownFlow',
    inputSchema: CourseTopicBreakdownInputSchema,
    outputSchema: CourseTopicBreakdownOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
