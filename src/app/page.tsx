
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BrainCircuit, BookOpen, Microscope, Lightbulb, FileDown, Bot, GraduationCap, MessagesSquare, Quote } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: 'Simplify Topics',
    description: 'Get beginner-friendly explanations for even the most complex subjects.',
  },
  {
    icon: <Microscope className="h-8 w-8 text-primary" />,
    title: 'Go Technical',
    description: 'Dive deep with detailed breakdowns and accurate technical information.',
  },
  {
    icon: <Quote className="h-8 w-8 text-primary" />,
    title: 'Real-World Examples',
    description: 'Understand concepts better with practical, relatable examples.',
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: 'Course Breakdowns',
    description: 'Break down any course into easy-to-manage topics and learn step-by-step.',
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Curated Resources',
    description: 'Access credible online resources, including articles and videos.',
  },
  {
    icon: <FileDown className="h-8 w-8 text-primary" />,
    title: 'Download as PDF',
    description: 'Save explanations offline so you can learn anytime, anywhere.',
  },
];

const testimonials = [
    {
        name: "Alex Johnson",
        title: "Computer Science Student",
        avatar: "https://placehold.co/100x100/E9D5FF/3730A3",
        dataAiHint: "student avatar",
        quote: "Mr. Bello is a game-changer. It helped me finally understand recursion. The way it breaks down complex topics is just amazing!"
    },
    {
        name: "Maria Garcia",
        title: "Lifelong Learner",
        avatar: "https://placehold.co/100x100/D1FAE5/065F46",
        dataAiHint: "woman portrait",
        quote: "I love learning new things, and this app makes it so easy and fun. The 'Simplify' feature is my favorite. Highly recommended!"
    },
    {
        name: "David Chen",
        title: "High School Teacher",
        avatar: "https://placehold.co/100x100/DBEAFE/1E40AF",
        dataAiHint: "teacher man",
        quote: "I use Mr. Bello to find new ways to explain difficult concepts to my students. The examples are always on point and very helpful."
    }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-slate-800">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
                <BrainCircuit className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-bold text-accent">Mr.Bello</h1>
            </div>
            <Button asChild className="hidden sm:inline-flex bg-gradient-to-r from-secondary to-primary text-white hover:from-secondary/90 hover:to-primary/90 shadow-lg transition-transform transform hover:scale-105">
                <Link href="/chat">Get Started</Link>
            </Button>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container flex flex-col items-center justify-center text-center py-20 md:py-32">
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
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
            <div className="container mx-auto text-center animate-in fade-in zoom-in-95 duration-500">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">A Smarter Way to Learn</h2>
                <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">Everything you need to conquer complex topics and accelerate your learning.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                            <CardHeader>
                                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
                                    {feature.icon}
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
            <div className="container mx-auto text-center animate-in fade-in zoom-in-95 duration-500">
                <h2 className="text-3xl md:text-4xl font-bold mb-12">Get Started in 3 Easy Steps</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
                    {/* Dashed line connector for desktop */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5">
                        <svg width="100%" height="2" className="absolute" style={{top: "-30px"}}>
                            <line x1="0" y1="1" x2="100%" y2="1" strokeWidth="2" strokeDasharray="8, 8" className="stroke-primary/50" />
                        </svg>
                    </div>

                    <div className="flex flex-col items-center gap-4 relative">
                        <div className="flex items-center justify-center h-16 w-16 bg-primary text-white rounded-full text-2xl font-bold border-4 border-white shadow-lg z-10">1</div>
                        <h3 className="text-xl font-semibold mt-2">Personalize Your AI</h3>
                        <p className="text-slate-600">Choose a tone and tell Mr. Bello your name to create a learning experience just for you.</p>
                    </div>
                    <div className="flex flex-col items-center gap-4 relative">
                        <div className="flex items-center justify-center h-16 w-16 bg-primary text-white rounded-full text-2xl font-bold border-4 border-white shadow-lg z-10">2</div>
                        <h3 className="text-xl font-semibold mt-2">Choose Your Path</h3>
                        <p className="text-slate-600">Ask about a specific topic or have Mr. Bello break down an entire course into modules.</p>
                    </div>
                    <div className="flex flex-col items-center gap-4 relative">
                        <div className="flex items-center justify-center h-16 w-16 bg-primary text-white rounded-full text-2xl font-bold border-4 border-white shadow-lg z-10">3</div>
                        <h3 className="text-xl font-semibold mt-2">Start Learning</h3>
                        <p className="text-slate-600">Interact with your AI teacher, refine explanations, get examples, and more!</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white">
            <div className="container mx-auto text-center animate-in fade-in zoom-in-95 duration-500">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Learners Worldwide</h2>
                <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">Don't just take our word for it. Here's what our users are saying.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                         <Card key={index} className="flex flex-col justify-between text-left p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <Quote className="h-8 w-8 text-primary/30 mb-4" />
                            <p className="text-slate-600 flex-1 mb-6">"{testimonial.quote}"</p>
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint}/>
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-sm text-slate-500">{testimonial.title}</p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Final CTA Section */}
        <section id="cta" className="py-20">
            <div className="container mx-auto text-center animate-in fade-in zoom-in-95 duration-500">
                 <div className="bg-white p-10 md:p-16 rounded-lg shadow-2xl max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Learning?</h2>
                    <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">Join thousands of learners who are mastering new skills with their AI-powered teacher. It's free to get started!</p>
                    <Button asChild size="lg" className="text-md md:text-lg py-4 px-6 md:py-8 md:px-10 bg-gradient-to-r from-secondary to-primary text-white hover:from-secondary/90 hover:to-primary/90 shadow-lg transition-transform transform hover:scale-105">
                        <Link href="/chat">Start Learning Now</Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>

      <footer className="text-center p-6 text-slate-500 bg-white border-t">
        <p>&copy; {new Date().getFullYear()} Olalekan Codes. All rights reserved.</p>
      </footer>
    </div>
  );
}
