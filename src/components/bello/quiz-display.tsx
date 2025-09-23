
'use client';

import { useState } from 'react';
import type { QuizQuestion } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizDisplayProps {
  questions: QuizQuestion[];
}

export default function QuizDisplay({ questions }: QuizDisplayProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [submitted, setSubmitted] = useState(false);

  const question = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const getResults = () => {
    const correct = Object.keys(selectedAnswers).filter(key => {
        const index = parseInt(key);
        return selectedAnswers[index] === questions[index].correctAnswer;
    }).length;
    return { correct, total: questions.length };
  }

  if (submitted && currentQuestionIndex >= questions.length) {
    const { correct, total } = getResults();
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Quiz Results</CardTitle>
                <CardDescription>You scored {correct} out of {total}!</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {questions.map((q, i) => (
                        <li key={i} className="p-3 rounded-lg border">
                            <p className="font-semibold">{i+1}. {q.questionText}</p>
                            <p className={cn(
                                "text-sm mt-1",
                                selectedAnswers[i] === q.correctAnswer ? 'text-green-600' : 'text-red-600'
                            )}>
                                Your answer: {selectedAnswers[i] || 'Not answered'}
                            </p>
                            <p className="text-sm text-green-600">Correct answer: {q.correctAnswer}</p>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
  }

  return (
    <div className="mt-4 border-t pt-3">
        <h3 className="text-lg font-semibold mb-2">Quiz Time!</h3>
      <Card>
        <CardHeader>
          <CardTitle>Question {currentQuestionIndex + 1}/{questions.length}</CardTitle>
          <CardDescription>{question.questionText}</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={selectedAnswers[currentQuestionIndex]}
            onValueChange={handleAnswerSelect}
            disabled={submitted}
          >
            {question.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === option;
                const isCorrect = question.correctAnswer === option;
                return (
                    <div key={index} className={cn(
                        "flex items-center space-x-2 rounded-md p-3 border transition-all",
                        submitted && isCorrect && "bg-green-100 border-green-300",
                        submitted && !isCorrect && isSelected && "bg-red-100 border-red-300",
                    )}>
                      <RadioGroupItem value={option} id={`q${currentQuestionIndex}-o${index}`} />
                      <Label htmlFor={`q${currentQuestionIndex}-o${index}`} className="flex-1 cursor-pointer">{option}</Label>
                      {submitted && isCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {submitted && !isCorrect && isSelected && <XCircle className="h-5 w-5 text-red-600" />}
                    </div>
                )
            })}
          </RadioGroup>
          {submitted && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                <p><span className="font-bold">Explanation:</span> {question.explanation}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                Previous
            </Button>
            {submitted ? (
                 <Button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                    {currentQuestionIndex === questions.length - 1 ? 'Show Results' : 'Next'}
                </Button>
            ) : (
                <Button onClick={handleSubmit} disabled={!selectedAnswers[currentQuestionIndex]}>
                    Submit
                </Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
