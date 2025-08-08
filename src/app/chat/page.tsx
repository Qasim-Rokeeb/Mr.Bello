'use client';

import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import WelcomeScreen from '@/components/bello/welcome-screen';
import ChatInterface from '@/components/bello/chat-interface';

export default function Home() {
  const { isConfigured } = useContext(AppContext);

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center bg-background">
      {isConfigured ? <ChatInterface /> : <WelcomeScreen />}
    </main>
  );
}
