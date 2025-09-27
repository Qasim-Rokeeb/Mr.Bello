
"use client";

import { cn } from "@/lib/utils";

export function WaveDivider({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <svg
        className="w-full h-auto"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1440,32L1320,48C1200,64,960,96,720,96C480,96,240,64,120,48L0,32L0,0L1440,0L1440,32Z"></path>
      </svg>
    </div>
  );
}
