import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import { AppProvider } from '@/context/app-context';

const inter = Inter({subsets: ['latin'], variable: '--font-sans'});

export const metadata: Metadata = {
  title: 'Mr. Bello – Your Personal AI Teacher',
  description: 'Mr. Bello is an AI-powered teacher that explains complex topics in a simple, personalized, and engaging way. Learn anything, from science to economics, step-by-step.',
  openGraph: {
    title: 'Mr. Bello – Your Personal AI Teacher',
    description: 'Unlock your potential with a friendly AI guide. Simplify complex topics, get real-world examples, and learn at your own pace.',
    url: 'https://mr-bello.ai', // Replace with your actual domain
    siteName: 'Mr. Bello',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: 'Mr. Bello - AI Teacher on a friendly background',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mr. Bello – Your Personal AI Teacher',
    description: 'Unlock your potential with a friendly AI guide. Simplify complex topics, get real-world examples, and learn at your own pace.',
    images: ['https://placehold.co/1200x630.png'], // Replace with your actual OG image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`font-body antialiased ${inter.variable}`}>
        <AppProvider>
          {children}
        </AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
