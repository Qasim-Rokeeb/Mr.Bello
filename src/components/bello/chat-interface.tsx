'use client';

import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '@/context/app-context';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './chat-message';
import ChatInput from './chat-input';
import { GraduationCap } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import TypingIndicator from './typing-indicator';
import CourseStatus from './course-status';

export default function ChatInterface() {
  const { messages, isLoading, activeCourse } = useContext(AppContext);
  const viewportRef = useRef<HTMLDivElement>(null);

  const lastMessage = messages[messages.length - 1];
  const showTypingIndicator = isLoading && lastMessage?.role === 'user';


  useEffect(() => {
    if (viewportRef.current) {
        viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, showTypingIndicator]);

  return (
    <div className="relative flex flex-col h-full max-h-screen w-full bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl sm:rounded-[1rem] shadow-2xl sm:border border-slate-200/50 dark:border-zinc-800 overflow-hidden radial-dot-pattern">
       <header className="flex items-center justify-between p-4 border-b dark:border-zinc-800 z-10">
        <div className="flex items-center gap-3 group">
          <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-inner transition-all duration-300 group-hover:shadow-[0_0_10px_hsl(var(--primary))]">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold">
            <span className="text-foreground transition-all duration-300 group-hover:text-primary">Mr.</span>
            <span className="text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_2px_hsl(var(--primary))]">Bello</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
            {activeCourse && <CourseStatus course={activeCourse} />}
            <ThemeToggle />
        </div>
      </header>
      <ScrollArea className="flex-1" viewportRef={viewportRef}>
        <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {showTypingIndicator && <TypingIndicator />}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-white/50 dark:bg-zinc-900/50 sm:rounded-b-[1rem] z-10 dark:border-zinc-800">
        <ChatInput />
        <p className="text-xs text-center text-muted-foreground mt-2 px-2">
            Mr. Bello can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
}
