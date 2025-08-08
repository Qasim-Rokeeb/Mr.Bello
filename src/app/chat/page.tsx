'use client';

import { useContext, useEffect } from 'react';
import { AppContext } from '@/context/app-context';
import WelcomeScreen from '@/components/bello/welcome-screen';
import ChatInterface from '@/components/bello/chat-interface';
import HistorySidebar from '@/components/bello/history-sidebar';
import { Sidebar, SidebarInset } from '@/components/ui/sidebar';

export default function Home() {
  const { isConfigured, messages, startNewChat, currentSessionId } = useContext(AppContext);

  useEffect(() => {
    if(isConfigured && !currentSessionId) {
      startNewChat();
    }
  }, [isConfigured, currentSessionId, startNewChat]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background p-0 sm:p-4">
      <HistorySidebar />
      <SidebarInset>
        <main className="h-full w-full max-w-4xl mx-auto">
          {isConfigured && messages.length > 0 ? <ChatInterface /> : <WelcomeScreen />}
        </main>
      </SidebarInset>
    </div>
  );
}
