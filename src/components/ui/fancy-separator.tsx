
"use client";

import { cn } from "@/lib/utils";

export function FancySeparator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "my-12 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent",
        className
      )}
    />
  );
}
