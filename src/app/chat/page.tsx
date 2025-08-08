'use client';

import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import WelcomeScreen from '@/components/bello/welcome-screen';
import ChatInterface from '@/components/bello/chat-interface';

export default function Home() {
  const { isConfigured } = useContext(AppContext);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background p-2 sm:p-4">
      <main className="h-full w-full max-w-4xl">
         {isConfigured ? <ChatInterface /> : <WelcomeScreen />}
      </main>
    </div>
  );
}
