import { cn } from "@/lib/utils";
import React from "react";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  pauseOnHover?: boolean;
  reverse?: boolean;
  vertical?: boolean;
}

const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  (
    { className, pauseOnHover = false, reverse = false, vertical = false, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex overflow-hidden [--duration:40s] [--gap:1rem]",
          { "flex-col": vertical },
          className
        )}
        {...props}
      >
        <div
          className={cn("flex w-max min-w-full shrink-0 animate-marquee items-center gap-[--gap]", {
            "group-hover:[animation-play-state:paused]": pauseOnHover,
            "[animation-direction:reverse]": reverse,
            "flex-col": vertical,
          })}
        >
          {children}
          {children}
        </div>
      </div>
    );
  }
);
Marquee.displayName = "Marquee";

export { Marquee };
