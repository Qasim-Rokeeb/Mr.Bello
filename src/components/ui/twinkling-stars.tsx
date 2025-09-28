
'use client';

import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface TwinklingStarsProps {
  count?: number;
  className?: string;
}

export function TwinklingStars({ count = 50, className }: TwinklingStarsProps) {
  const stars = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = `${Math.random() * 2 + 1}px`;
      const delay = `${Math.random() * 5}s`;
      const duration = `${Math.random() * 5 + 3}s`;
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;

      return (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            width: size,
            height: size,
            top,
            left,
            animationDelay: delay,
            animationDuration: duration,
          }}
        />
      );
    });
  }, [count]);

  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      {stars}
    </div>
  );
}
