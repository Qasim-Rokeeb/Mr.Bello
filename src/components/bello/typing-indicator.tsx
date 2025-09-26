
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 sm:gap-4 justify-start animate-in fade-in-0">
      <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
        <AvatarImage src="/mr-bello.png" alt="Mr. Bello Avatar" />
        <AvatarFallback>MB</AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-1.5 rounded-2xl bg-card text-card-foreground border rounded-bl-lg px-4 py-3 shadow-md h-10 sm:h-12">
        <span className="h-2 w-2 animate-bouncy-dot rounded-full bg-muted-foreground [animation-delay:0s]"></span>
        <span className="h-2 w-2 animate-bouncy-dot rounded-full bg-muted-foreground [animation-delay:0.1s]"></span>
        <span className="h-2 w-2 animate-bouncy-dot rounded-full bg-muted-foreground [animation-delay:0.2s]"></span>
      </div>
    </div>
  );
}
