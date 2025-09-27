
'use client';

import { cn } from '@/lib/utils';

interface CornerRibbonProps {
  text: string;
  className?: string;
}

export function CornerRibbon({ text, className }: CornerRibbonProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute -top-10 -right-10 z-10 h-28 w-28 overflow-hidden",
        className
      )}
    >
      <div className="absolute top-0 left-0 h-full w-full bg-primary shadow-md"></div>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 text-center text-xs font-semibold text-primary-foreground"
      >
        {text}
      </div>
    </div>
  );
}
