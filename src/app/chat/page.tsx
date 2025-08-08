'use client';

import { useContext, useEffect } from 'react';
import { AppContext } from '@/context/app-context';
import WelcomeScreen from '@/components/bello/welcome-screen';
import ChatInterface from '@/components/bello/chat-interface';

export default function Home() {
  const { isConfigured, messages, startNewChat, name } = useContext(AppContext);

  useEffect(() => {
    if(isConfigured && !name) {
      startNewChat();
    }
  }, [isConfigured, name, startNewChat]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background p-0 sm:p-4">
      <main className="h-full w-full max-w-4xl mx-auto">
        {isConfigured ? <ChatInterface /> : <WelcomeScreen />}
      </main>
    </div>
  );
}
