'use client';

import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '@/context/app-context';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './chat-message';
import ChatInput from './chat-input';
import { BrainCircuit } from 'lucide-react';

export default function ChatInterface() {
  const { messages } = useContext(AppContext);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-h-screen w-full bg-card rounded-lg shadow-2xl border-2 border-primary/10">
       <header className="flex items-center p-3 sm:p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-primary-foreground rounded-full p-2">
            <BrainCircuit className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-accent">Mr.Bello</h1>
        </div>
      </header>
      <ScrollArea className="flex-1 p-3 sm:p-4" ref={scrollAreaRef}>
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>
      <div className="p-3 sm:p-4 border-t bg-card/50 rounded-b-lg">
        <ChatInput />
      </div>
    </div>
  );
}
