import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GraduationCap, BookOpen, Microscope, Lightbulb, FileDown, Quote, Globe, Twitter, Github } from 'lucide-react';
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
    avatar: "https://placehold.co/100x100.png",
    dataAiHint: "student avatar",
    quote: "Mr. Bello is a game-changer. A very nice application that breaks down complex terms. Really makes learning a lot more easy and fun."
  },
  {
    name: "Abraham",
    title: "Information System student",
    avatar: "https://placehold.co/100x100.png",
    dataAiHint: "woman portrait",
    quote: "I find Mr.Bello very useful in explaining and breaking complex topics, 'Simplify' feature is my favorite. Highly recommended!"
  },
  {
    name: "David Chen",
    title: "High School Teacher",
    avatar: "https://placehold.co/100x100.png",
    dataAiHint: "teacher man",
    quote: "I use Mr. Bello to find new ways to explain difficult concepts to my students. The examples are always on point and very helpful."
  }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-slate-800">
      
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-secondary drop-shadow-sm" />
            <h1 className="text-2xl font-extrabold tracking-tight text-primary">
              <span className="text-slate-800">Mr.</span><span className="text-secondary">Bello</span>
            </h1>
          </div>
          <Button
            asChild
            className="hidden sm:inline-flex bg-gradient-to-r from-secondary to-primary text-white shadow-md hover:shadow-lg transition-all hover:scale-105"
          >
            <Link href="/chat">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 pt-16">
        
        {/* Hero */}
        <section className="container flex flex-col items-center text-center py-24 md:py-32">
          <div className="max-w-3xl animate-in fade-in zoom-in-95 duration-700">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-slate-800">
              Unlock Your Potential with{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Mr.Bello</span>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Your friendly <span className="font-semibold text-primary">AI teacher</span>, making complex topics <span className='font-semibold text-primary'>simple and learning an adventure</span>. 
              Whether you want to <span className="font-semibold text-secondary">simplify a tough subject</span>, get <span className="font-semibold text-secondary">technical details</span>, find <span className="font-semibold text-secondary">real-world examples</span>, 
              or break down an <span className="font-semibold text-secondary">entire course</span> into easy modules — Mr. Bello is here to help.
            </p>
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-secondary to-primary text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000"
              >
                <Link href="/chat">Start Learning Now</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 bg-white">
          <div className="container text-center animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">A Smarter Way to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Learn</span></h3>
            <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
              Everything you need to conquer complex topics and accelerate your learning.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <Card
                  key={i}
                  className="text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 rounded-2xl border border-slate-100 animate-in fade-in-0 slide-in-from-bottom-12"
                  style={{ animationDelay: `${'i * 100'}ms` }}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4 shadow-inner">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
          <div className="container text-center animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
            <h3 className="text-3xl md:text-4xl font-bold mb-12">Get Started in 3 Easy Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
              {['Personalize Your AI', 'Choose Your Path', 'Start Learning'].map((title, i) => (
                <div key={i} className="flex flex-col items-center gap-4 animate-in fade-in-0 slide-in-from-bottom-12" style={{ animationDelay: `${'i * 150'}ms` }}>
                  <div className="flex items-center justify-center h-16 w-16 bg-primary text-white rounded-full text-2xl font-bold shadow-lg border-4 border-white">
                    {i + 1}
                  </div>
                  <h4 className="text-xl font-semibold">{title}</h4>
                  <p className="text-slate-600 max-w-xs">
                    {i === 0 && 'Choose a tone and tell Mr. Bello your name for a personalized learning experience.'}
                    {i === 1 && 'Ask about a specific topic or have Mr. Bello break down an entire course.'}
                    {i === 2 && 'Refine explanations, get examples, and keep learning at your pace.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 bg-white">
          <div className="container text-center animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Loved by Learners Worldwide</h3>
            <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
              Don't just take our word for it — here's what our users are saying.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <Card
                  key={i}
                  className="flex flex-col justify-between p-6 shadow-lg hover:shadow-2xl rounded-2xl border border-slate-100 transition-all animate-in fade-in-0 slide-in-from-bottom-12"
                  style={{ animationDelay: `${'i * 150'}ms` }}
                >
                  <Quote className="h-8 w-8 text-primary/30 mb-4" />
                  <p className="text-slate-600 flex-1 mb-6">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={t.avatar} alt={`${t.name} - ${t.title}`} data-ai-hint={t.dataAiHint} />
                      <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-slate-500">{t.title}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="container text-center">
            <div className="bg-gradient-to-br from-white to-indigo-50 p-10 md:p-16 rounded-2xl shadow-2xl max-w-4xl mx-auto border border-slate-100 animate-in fade-in zoom-in-95 duration-500">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Learning?</h3>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                Join thousands of learners mastering new skills with their AI-powered teacher. It's free to get started!
              </p>
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-secondary to-primary text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Link href="/chat">Start Learning Now</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <footer className="text-center p-6 text-slate-500 bg-white border-t">
        <div className="flex justify-center gap-6 mb-4">
            <Link href="#" className="hover:text-primary transition-colors"><Twitter className="h-6 w-6" /></Link>
            <Link href="#" className="hover:text-primary transition-colors"><Github className="h-6 w-6" /></Link>
        </div>
        <p>&copy; {new Date().getFullYear()} <span className="font-bold">Mr.Bello</span>. All rights reserved. Made with ❤️ for lifelong learners.</p>
      </footer>
    </div>
  );
}
