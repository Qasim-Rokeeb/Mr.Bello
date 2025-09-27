
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { RotateCcw } from 'lucide-react';

interface FlashcardContextValue {
  isFlipped: boolean;
  setIsFlipped: React.Dispatch<React.SetStateAction<boolean>>;
}

const FlashcardContext = React.createContext<FlashcardContextValue | null>(null);

const useFlashcard = () => {
  const context = React.useContext(FlashcardContext);
  if (!context) {
    throw new Error('useFlashcard must be used within a Flashcard component');
  }
  return context;
};

const Flashcard = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <FlashcardContext.Provider value={{ isFlipped, setIsFlipped }}>
      <div
        className={cn('group/flashcard h-64 w-full [perspective:1000px]', className)}
        {...props}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={cn(
            'relative h-full w-full rounded-lg shadow-lg transition-transform duration-700 [transform-style:preserve-3d]',
            isFlipped && '[transform:rotateY(180deg)]'
          )}
        >
          {children}
        </div>
      </div>
    </FlashcardContext.Provider>
  );
};

const FlashcardFront = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'absolute h-full w-full rounded-lg border bg-card text-card-foreground [backface-visibility:hidden]',
        'flex items-center justify-center',
        className
      )}
      {...props}
    >
        {children}
        <Button variant="ghost" size="icon" className="absolute bottom-2 right-2 text-muted-foreground group-hover/flashcard:text-primary">
            <RotateCcw className="h-4 w-4" />
            <span className="sr-only">Flip card</span>
        </Button>
    </div>
  );
};

const FlashcardBack = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'absolute h-full w-full rounded-lg border bg-card text-card-foreground [backface-visibility:hidden] [transform:rotateY(180deg)]',
        'flex items-center justify-center',
        className
      )}
      {...props}
    >
        {children}
        <Button variant="ghost" size="icon" className="absolute bottom-2 right-2 text-muted-foreground group-hover/flashcard:text-primary">
            <RotateCcw className="h-4 w-4" />
            <span className="sr-only">Flip card</span>
        </Button>
    </div>
  );
};

Flashcard.Front = FlashcardFront;
Flashcard.Back = FlashcardBack;

export { Flashcard, FlashcardFront, FlashcardBack };
