'use client';

import { useState } from 'react';
import type { QuizQuestion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Flashcard } from '@/components/ui/flashcard';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface QuizDisplayProps {
  questions: QuizQuestion[];
}

export default function QuizDisplay({ questions }: QuizDisplayProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const question = questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (showResults) {
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Quiz Complete!</CardTitle>
                <CardDescription>Great job reviewing the material. You've finished the quiz.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => {
                    setCurrentQuestionIndex(0);
                    setShowResults(false);
                }}>
                    Review Questions Again
                </Button>
            </CardContent>
        </Card>
    )
  }

  return (
    <div className="mt-4 border-t pt-3 space-y-4">
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Quiz Time!</h3>
            <p className="text-sm text-muted-foreground">Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>
        <Flashcard>
            <Flashcard.Front>
                <div className="flex flex-col items-center justify-center text-center h-full p-6">
                    <p className="text-xl font-semibold">{question.questionText}</p>
                </div>
            </Flashcard.Front>
            <Flashcard.Back>
                <div className="flex flex-col items-center justify-center text-center h-full p-6">
                    <p className="text-lg font-semibold text-green-600 dark:text-green-400">Correct Answer:</p>
                    <p className="text-md mb-4">{question.correctAnswer}</p>
                    <p className="text-sm text-muted-foreground"><span className="font-bold">Explanation:</span> {question.explanation}</p>
                </div>
            </Flashcard.Back>
        </Flashcard>
        <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
            </Button>
            <Button onClick={handleNext}>
                {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next'}
                <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    </div>
  );
}
