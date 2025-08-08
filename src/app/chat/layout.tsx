import { AppProvider } from '@/context/app-context';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </AppProvider>
  );
}
