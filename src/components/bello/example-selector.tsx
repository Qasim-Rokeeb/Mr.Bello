'use client';

import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import type { ExampleDifficulty } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Quote } from 'lucide-react';

interface ExampleSelectorProps {
  topic: string;
}

const exampleDifficulties: ExampleDifficulty[] = ['beginner', 'intermediate', 'advanced'];

export default function ExampleSelector({ topic }: ExampleSelectorProps) {
  const { refineExplanation, isLoading } = useContext(AppContext);

  const handleSelectExample = (difficulty: ExampleDifficulty) => {
    refineExplanation(topic, 'examples', difficulty);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isLoading}>
          <Quote className="mr-2 h-4 w-4" />
          Examples
          <ChevronDown className="ml-2 h-4 w-4 animate-bounce-subtle" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {exampleDifficulties.map((difficulty) => (
          <DropdownMenuItem
            key={difficulty}
            onSelect={() => handleSelectExample(difficulty)}
            disabled={isLoading}
          >
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
