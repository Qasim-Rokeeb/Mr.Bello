'use client';

import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { BrainCircuit, MessageSquarePlus, Trash2 } from 'lucide-react';

export default function HistorySidebar() {
  const { history, loadChat, startNewChat, clearHistory, currentSessionId } = useContext(AppContext);

  const sortedHistory = [...history].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-accent">Mr.Bello</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <Button
          variant="outline"
          className="w-full mb-2"
          onClick={startNewChat}
        >
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            New Chat
        </Button>
        <SidebarMenu>
          {sortedHistory.map(session => (
            <SidebarMenuItem key={session.id}>
              <SidebarMenuButton 
                onClick={() => loadChat(session.id)}
                isActive={session.id === currentSessionId}
                className="truncate"
              >
                {session.title}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={clearHistory}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear History
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
