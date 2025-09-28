
'use client';

import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

export function FloatingParticles({ count = 40, className }: FloatingParticlesProps) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = `${Math.random() * 3 + 1}px`;
      const delay = `${Math.random() * 10}s`;
      const duration = `${Math.random() * 10 + 10}s`;
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;
      const opacity = Math.random() * 0.5 + 0.2;

      return (
        <div
          key={i}
          className="absolute rounded-full bg-primary/50 animate-float"
          style={{
            width: size,
            height: size,
            top,
            left,
            animationDelay: delay,
            animationDuration: duration,
            opacity,
          }}
        />
      );
    });
  }, [count]);

  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      {particles}
    </div>
  );
}
