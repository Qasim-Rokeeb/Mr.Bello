
import { Button } from '@/components/ui/button';
import { BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <header className="p-4 flex justify-between items-center animate-in fade-in duration-500">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-accent">Mr.Bello</h1>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="max-w-3xl animate-in fade-in zoom-in-95 duration-700">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-800 leading-tight tracking-tighter">
            Unlock Your Potential with{' '}
            <span className="text-primary">Mr.Bello</span>
          </h2>
          <p className="mt-6 text-md sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Your friendly AI teacher, making complex topics simple and learning an adventure. Whether you want to simplify a tough subject, get technical details, find real-world examples, or break down an entire course into easy-to-learn modules, Mr. Bello is here to help. Ready to dive in?
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="text-md md:text-lg py-4 px-6 md:py-8 md:px-10 bg-gradient-to-r from-secondary to-primary text-white hover:from-secondary/90 hover:to-primary/90 shadow-lg transition-transform transform hover:scale-105">
              <Link href="/chat">Start Learning Now</Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="text-center p-6 text-slate-500 animate-in fade-in duration-500">
        <p>&copy; {new Date().getFullYear()} Olalekan Codes. All rights reserved.</p>
      </footer>
    </div>
  );
}
