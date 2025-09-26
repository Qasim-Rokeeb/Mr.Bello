'use client';

import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '@/context/app-context';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './chat-message';
import ChatInput from './chat-input';
import { GraduationCap } from 'lucide-react';

export default function ChatInterface() {
  const { messages } = useContext(AppContext);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewportRef.current) {
        viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="relative flex flex-col h-full max-h-screen w-full bg-white/70 backdrop-blur-xl sm:rounded-[1rem] shadow-2xl sm:border border-slate-200/50 overflow-hidden">
       <header className="flex items-center justify-between p-4 border-b z-10">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground rounded-full p-2 shadow-inner">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold">
            <span className="text-foreground">Mr.</span><span className="text-primary">Bello</span>
          </h1>
        </div>
      </header>
      <ScrollArea className="flex-1" viewportRef={viewportRef}>
        <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-white/50 sm:rounded-b-[1rem] z-10">
        <ChatInput />
        <p className="text-xs text-center text-muted-foreground mt-2 px-2">
            Mr. Bello can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
}

    