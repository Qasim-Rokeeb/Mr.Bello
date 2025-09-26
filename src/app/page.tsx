

'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote, GraduationCap, BookOpen, Microscope, Lightbulb, FileDown, Globe, Github, MessageSquare, Settings, Route, Rocket } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { FancySeparator } from '@/components/ui/fancy-separator';
import { SpotlightButton } from '@/components/ui/spotlight-button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

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
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: 'Practical Applications',
    description: 'Explore how topics are used in the real world to solve actual problems.',
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
    name: "Khadija",
    title: "Physiology Student",
    quote: "Mr. Bello is a game-changer. A very nice application that breaks down complex terms. Really makes learning a lot more easy and fun."
  },
  {
    name: "Abraham",
    title: "Information System student",
    quote: "I find Mr.Bello very useful in explaining and breaking complex topics, 'Simplify' feature is my favorite. Highly recommended!"
  },
  {
    name: "David Chen",
    title: "High School Teacher",
    quote: "I use Mr. Bello to find new ways to explain difficult concepts to my students. The examples are always on point and very helpful."
  }
];

const howItWorksSteps = [
    {
      title: 'Personalize Your AI',
      description: 'Choose a tone and tell Mr. Bello your name for a personalized learning experience.',
      icon: <Settings className="h-10 w-10" />
    },
    {
      title: 'Choose Your Path',
      description: 'Ask about a specific topic or have Mr. Bello break down an entire course.',
      icon: <Route className="h-10 w-10" />
    },
    {
      title: 'Start Learning',
      description: 'Refine explanations, get examples, and keep learning at your pace.',
      icon: <Rocket className="h-10 w-10" />
    }
  ];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    const stepInterval = setInterval(() => {
        setActiveStep(prev => (prev + 1) % (howItWorksSteps.length + 1));
    }, 2000);


    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      
      {/* Header */}
      <header className={cn("fixed top-0 z-50 w-full border-b transition-all duration-300", scrolled ? "border-border bg-background/80 shadow-md backdrop-blur-lg" : "border-transparent")}>
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-primary drop-shadow-sm" />
            <h1 className="text-2xl font-extrabold tracking-tight">
              <span>Mr.</span><span className="text-primary">Bello</span>
            </h1>
          </div>
          <Button
            asChild
            className="hidden sm:inline-flex bg-gradient-to-br from-primary to-blue-400 text-primary-foreground shadow-lg hover:shadow-blue-500/50 transition-all duration-200 ease-out hover:-translate-y-0.5"
          >
            <Link href="/chat">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 pt-16">
        
        {/* Hero */}
        <section className="container flex flex-col items-center text-center py-24 md:py-32">
          <div className="max-w-3xl animate-in fade-in zoom-in-95 duration-700">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tighter animate-in fade-in-0 slide-in-from-bottom-8 duration-700">
              Unlock Your Potential with{' '}
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Mr.Bello</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-bottom-8 duration-700" style={{ animationDelay: '200ms' }}>
              Your friendly AI teacher for any topic. Ask a question, or break down an entire course. Learning has never been this simple.
            </p>
            <div className="mt-10 animate-in fade-in-0 slide-in-from-bottom-8 duration-700" style={{ animationDelay: '400ms' }}>
              <SpotlightButton asChild>
                <Link href="/chat">Start Learning Now</Link>
              </SpotlightButton>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 bg-background">
          <div className="container text-center animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">A Smarter Way to <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Learn</span></h3>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Everything you need to conquer complex topics and accelerate your learning.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <Card
                  key={i}
                  className="text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-[1rem] border bg-card animate-in fade-in-0 slide-in-from-bottom-12"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4 shadow-inner">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg font-semibold text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <FancySeparator />

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-background">
            <div className="container text-center animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Get Started in 3 Easy Steps</span>
                </h3>
                <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Follow these simple steps to start your personalized learning journey.
                </p>
                <div className="relative max-w-2xl mx-auto mb-12">
                    <Progress value={(activeStep / (howItWorksSteps.length -1)) * 100} className="h-2"/>
                    <div className="absolute inset-0 flex justify-between">
                        {howItWorksSteps.map((_, i) => (
                            <div key={i} className={cn(
                                "w-6 h-6 rounded-full transition-all duration-500",
                                i < activeStep ? "bg-primary" : "bg-muted border-2 border-border",
                                i === activeStep && "bg-primary ring-4 ring-primary/30"
                            )}></div>
                        ))}
                    </div>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="absolute top-1/2 left-0 right-0 -mt-8 hidden md:block">
                        <svg className="w-full h-auto" viewBox="0 0 800 20">
                            <path
                                d="M 0,10 C 150,10 150,-10 300,10 S 450,30 600,10 S 750,-10 800,10"
                                fill="none"
                                stroke="hsl(var(--border))"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                className="opacity-50"
                            />
                        </svg>
                    </div>

                    {howItWorksSteps.map((step, i) => (
                        <div key={i} className={cn(
                            "relative flex flex-col items-center gap-4 p-4 rounded-lg transition-all duration-500",
                            i === activeStep ? "transform scale-105" : "opacity-70"
                        )}>
                            <div className={cn(
                                "flex items-center justify-center h-16 w-16 rounded-full shadow-inner transition-colors duration-500 bg-background z-10",
                                i <= activeStep ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                            )}>
                                {step.icon}
                            </div>
                            <h4 className="text-xl font-semibold text-foreground">{step.title}</h4>
                            <p className="text-muted-foreground max-w-xs">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <FancySeparator />

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-background">
          <div className="container text-center animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
            <h3 className="text-3xl md:text-4xl font-bold mb-4"><span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Loved by Learners Worldwide</span></h3>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Don't just take our word for it — here's what our users are saying.
            </p>
            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <Card
                  key={i}
                  className="flex flex-col justify-between p-6 shadow-md hover:shadow-xl rounded-[1rem] border bg-card transition-all hover:-translate-y-1 animate-in fade-in-0 slide-in-from-bottom-12"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <p className="text-muted-foreground flex-1 mb-6">"{t.quote}"</p>
                  <div>
                    <p className="font-semibold text-foreground">
                        <span className="animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_100%]">
                            {t.name}
                        </span>
                    </p>
                    <p className="text-sm text-muted-foreground">{t.title}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full max-w-xs mx-auto"
              >
                <CarouselContent>
                  {testimonials.map((t, i) => (
                    <CarouselItem key={i}>
                      <div className="p-1">
                        <Card className="flex flex-col justify-between p-6 shadow-md rounded-[1rem] border bg-card h-full">
                            <Quote className="h-8 w-8 text-primary/30 mb-4" />
                            <p className="text-muted-foreground flex-1 mb-6">"{t.quote}"</p>
                            <div>
                                <p className="font-semibold text-foreground">
                                    <span className="animate-shimmer bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_100%]">
                                        {t.name}
                                    </span>
                                </p>
                                <p className="text-sm text-muted-foreground">{t.title}</p>
                            </div>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </section>

        <FancySeparator />

        {/* Newsletter CTA */}
        <section className="py-20">
          <div className="container">
            <div className="bg-card p-10 md:p-16 rounded-[1rem] shadow-xl max-w-4xl mx-auto border animate-in fade-in zoom-in-95 duration-500">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4"><span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Stay Sharp, Stay Ahead</span></h3>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Subscribe to our newsletter for learning tips, new features, and exclusive content.
                    </p>
                </div>
                <div className="w-full max-w-md">
                    <form className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Input
                                id="email"
                                type="email"
                                placeholder=" " 
                                className="peer h-12 text-base"
                                required
                            />
                            <label 
                                htmlFor="email"
                                className="absolute left-3 top-3 text-muted-foreground transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary bg-background px-1"
                            >
                                Email Address
                            </label>
                        </div>
                        <Button
                            type="submit"
                            size="lg"
                            className="h-12 text-base bg-gradient-to-br from-primary to-blue-400 text-primary-foreground shadow-lg hover:shadow-blue-500/50 transition-all duration-200 ease-out hover:-translate-y-0.5"
                        >
                            Subscribe
                        </Button>
                    </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="container text-center">
            <div className="bg-card p-10 md:p-16 rounded-[1rem] shadow-xl max-w-4xl mx-auto border animate-in fade-in zoom-in-95 duration-500">
              <h3 className="text-3xl md:text-4xl font-bold mb-4"><span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Ready to Transform Your Learning?</span></h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of learners mastering new skills with their AI-powered teacher. It's free to get started!
              </p>
              <SpotlightButton asChild>
                <Link href="/chat">Start Learning</Link>
              </SpotlightButton>
            </div>
          </div>
        </section>

      </main>

      {/* Live Chat FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button asChild size="icon" className="h-14 w-14 rounded-full shadow-2xl">
          <Link href="/chat">
            <span className="absolute h-full w-full rounded-full bg-primary animate-ping opacity-75"></span>
            <MessageSquare className="h-7 w-7" />
            <span className="sr-only">Open Chat</span>
          </Link>
        </Button>
      </div>

      <footer className="text-center p-6 text-muted-foreground bg-background border-t animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
        <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
                <p className="text-xs">Connect with the developer</p>
                <div className="flex justify-center gap-3">
                    <Link href="https://x.com/qasimrokeeb/" className="hover:text-primary transition-colors">
                        <svg
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </Link>
                    <Link href="https://github.com/qasim-rokeeb" className="hover:text-primary transition-colors"><Github className="h-4 w-4" /></Link>
                </div>
            </div>
             <div className="flex items-center gap-2">
                <p className="text-sm">Built with ❤️ for lifelong learners</p>
                <span className="text-slate-400">|</span>
                <p className="text-sm">© 2024 <span className="font-bold text-foreground">Mr.Bello</span>. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}

    

    



    

    


    

    

    

    