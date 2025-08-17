'use client';

import { useState, useContext, FormEvent } from 'react';
import { AppContext } from '@/context/app-context';
import type { LearningMode } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { LoaderCircle, Send } from 'lucide-react';

export default function ChatInput() {
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState<LearningMode>('topic');
  const { sendMessage, isLoading } = useContext(AppContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue, mode);
      setInputValue('');
    }
  };

  const placeholderText = mode === 'topic' 
    ? "e.g., 'What is quantum physics?'"
    : "e.g., 'Introduction to Psychology'";

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <RadioGroup
        value={mode}
        onValueChange={(value: LearningMode) => setMode(value)}
        className="flex items-center gap-4"
        disabled={isLoading}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="topic" id="r1" />
          <Label htmlFor="r1" className="text-sm sm:text-base">Explain a Topic</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="course" id="r2" />
          <Label htmlFor="r2" className="text-sm sm:text-base">Breakdown a Course</Label>
        </div>
      </RadioGroup>
      <div className="flex items-start gap-2 sm:gap-4">
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholderText}
          className="flex-1 resize-none text-base"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          disabled={isLoading}
        />
        <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()} className="h-10 w-10 sm:h-12 sm:w-12 bg-secondary hover:bg-secondary/80">
          {isLoading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </form>
  );
}
