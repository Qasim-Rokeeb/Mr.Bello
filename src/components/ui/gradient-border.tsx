"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface GradientBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  active?: boolean;
}

const GradientBorder = React.forwardRef<
  HTMLDivElement,
  GradientBorderProps
>(({ className, as: Comp = "div", active = false, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("relative p-[2px] rounded-[10px] transition-all", active ? 'bg-gradient-to-r from-primary to-blue-400' : 'bg-transparent')}>
      <Comp
        className={cn(
          "w-full h-full rounded-lg",
          className
        )}
        {...props}
      />
    </div>
  )
})
GradientBorder.displayName = "GradientBorder"

export { GradientBorder }
