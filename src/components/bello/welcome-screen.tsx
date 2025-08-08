'use client';

import { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';
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

const tones: Tone[] = ['Gentle', 'Encouraging', 'Formal', 'Fun'];

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(50),
  tone: z.enum(tones),
  humor: z.boolean(),
});

export default function WelcomeScreen() {
  const { saveSettings } = useContext(AppContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      tone: 'Gentle',
      humor: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    saveSettings(values as Settings);
  }

  return (
    <Card className="w-full max-w-lg shadow-2xl border-2 border-primary/10">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
            <BrainCircuit className="h-10 w-10" />
        </div>
        <CardTitle className="text-3xl font-bold text-primary">Welcome to Mr.Bello!</CardTitle>
        <CardDescription className="text-muted-foreground text-lg">
          I'm Mr. Bello. Let's get you set up for learning.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">What should I call you?</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Alex" {...field} className="text-lg py-6" />
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
                  <FormLabel className="text-lg">Choose my tone:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      {tones.map((tone) => (
                        <FormItem key={tone} className="flex-1">
                          <FormControl>
                             <RadioGroupItem value={tone} className="sr-only" id={`tone-${tone}`} />
                          </FormControl>
                          <Label htmlFor={`tone-${tone}`} className="block w-full cursor-pointer rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:shadow-lg [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:shadow-md transition-all text-center text-md font-medium">
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
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-lg">Enable Funny Gestures?</FormLabel>
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
            <Button type="submit" size="lg" className="w-full text-lg py-7 bg-secondary hover:bg-secondary/90">
              Start Learning
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
