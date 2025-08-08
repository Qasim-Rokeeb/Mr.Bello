import { AppProvider } from '@/context/app-context';

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppProvider>{children}</AppProvider>;
}
