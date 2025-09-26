
'use client';

import { useRef, useState, MouseEvent, ReactNode } from 'react';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface SpotlightButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children: ReactNode;
}

export function SpotlightButton({ asChild, children, className, ...props }: SpotlightButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: '-100%', y: '-100%' });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x: `${x}px`, y: `${y}px` });
  };

  const handleMouseLeave = () => {
    setPosition({ x: '-100%', y: '-100%' });
  };

  return (
    <Button
      size="lg"
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative text-lg px-8 py-6 bg-gradient-to-br from-primary to-blue-400 text-primary-foreground shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-200 ease-out hover:-translate-y-1 overflow-hidden',
        className
      )}
      asChild={asChild}
      {...props}
    >
        <>
            {children}
            <div
            className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
                background: `radial-gradient(150px at ${position.x} ${position.y}, rgba(255, 255, 255, 0.25), transparent)`,
            }}
            />
        </>
    </Button>
  );
}
