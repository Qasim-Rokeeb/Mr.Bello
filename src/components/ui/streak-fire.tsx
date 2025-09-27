
'use client';

import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"

interface StreakFireProps {
  streakCount: number;
  className?: string;
}

export function StreakFire({ streakCount, className }: StreakFireProps) {
    if (streakCount === 0) return null;

  return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <div className={cn("relative flex items-center gap-1 text-orange-500", className)}>
                    <div className="relative">
                        <Flame className="h-6 w-6 drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]" />
                        <div className="absolute inset-0 -z-10 animate-fire-pulse rounded-full bg-orange-500/50 blur-md"></div>
                        <div className="absolute inset-0 -z-10 animate-fire-flicker rounded-full bg-yellow-400/30 blur-lg"></div>
                    </div>
                    <span className="font-bold text-sm drop-shadow-sm">{streakCount}</span>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                <p>You have a {streakCount}-day streak! Keep it up!</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>

  );
}
