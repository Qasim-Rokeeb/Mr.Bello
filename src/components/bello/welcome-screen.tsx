'use client';

import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AppContext } from '@/context/app-context';
import type { Settings, Tone } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { BrainCircuit } from 'lucide-react';

const tones: Tone[] = ['Gentle', 'Encouraging', 'Formal', 'Fun', 'Sarcastic', 'Creative'];

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(50),
  tone: z.enum(tones),
  humor: z.boolean(),
});

export default function WelcomeScreen() {
  const { saveSettings, settings } = useContext(AppContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: settings.name || '',
      tone: settings.tone || 'Gentle',
      humor: settings.humor,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    saveSettings(values as Settings);
  }

  return (
    <div className=" flex items-center justify-center">
        <Card className="w-full max-w-lg shadow-2xl my-4 sm:my-15 border-2 border-primary/10 animate-in fade-in-0 zoom-in-95 duration-500">
        <CardHeader className="text-center">
            <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                <BrainCircuit className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <CardTitle className="text-2xl sm:text-3xl font-bold">
              <span className="text-foreground">Welcome to Mr.</span><span className="text-secondary">Bello</span>!
            </CardTitle>
            <CardDescription className="text-base sm:text-lg text-muted-foreground">
            I'm Mr. Bello. Let's get you set up for learning.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="text-base sm:text-lg">What should I call you?</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Alex" {...field} className="text-base sm:text-lg py-5 sm:py-6" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                    <FormLabel className="text-base sm:text-lg">Choose my tone:</FormLabel>
                    <FormControl>
                        <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4"
                        >
                        {tones.map((tone) => (
                            <FormItem key={tone} className="flex-1">
                            <RadioGroupItem value={tone} className="sr-only peer" id={`tone-${tone}`} />
                            <Label htmlFor={`tone-${tone}`} className="block w-full cursor-pointer rounded-lg border-2 border-muted bg-popover p-3 sm:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:shadow-lg transition-all text-center text-sm sm:text-base font-medium">
                                {tone}
                            </Label>
                            </FormItem>
                        ))}
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <FormField
                control={form.control}
                name="humor"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 sm:p-4 shadow-sm">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base sm:text-lg">Enable Funny Gestures?</FormLabel>
                    </div>
                    <FormControl>
                        <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    </FormItem>
                )}
                />
                <Button type="submit" size="lg" className="w-full text-base sm:text-lg py-6 sm:py-7 bg-secondary hover:bg-secondary/90">
                Start Learning
                </Button>
            </form>
            </Form>
        </CardContent>
        </Card>
    </div>
  );
}

    