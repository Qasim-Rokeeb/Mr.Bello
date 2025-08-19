import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import { AppProvider } from '@/context/app-context';

const inter = Inter({subsets: ['latin'], variable: '--font-sans'});

export const metadata: Metadata = {
  title: 'Mr. Bello – Your Personal AI Teacher for Any Topic',
  description: 'Mr. Bello is a friendly AI-powered teacher that makes learning easy. Get simple explanations, technical details, course breakdowns, and real-world examples for any subject.',
  keywords: ['AI teacher', 'learn anything', 'education app', 'complex topics simplified', 'course breakdown', 'AI learning assistant'],
  openGraph: {
    title: 'Mr. Bello – Your Personal AI Teacher',
    description: 'Unlock your potential with a friendly AI guide. Simplify complex topics, get real-world examples, and learn at your own pace.',
    url: 'https://mr-bello.ai', // Replace with your actual domain
    siteName: 'Mr. Bello',
    images: [
      {
        url: '/og-image.png', // Replace with your actual OG image URL
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
    title: 'Mr. Bello – Your Personal AI Teacher for Any Topic',
    description: 'Unlock your potential with a friendly AI guide. Simplify complex topics, get real-world examples, and learn at your own pace.',
    images: ['/og-image.png'], // Replace with your actual OG image URL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
       <meta name="google-site-verification" content="S4BXCgKSgJyFAhOJS_P8ojh9VFpAVHYo0b9mTyGN8uM" />
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

    