
'use client';

import { cn } from '@/lib/utils';
import React from 'react';

const pythonCode = (
  <>
    <span className="text-purple-400">async</span> <span className="text-blue-400">def</span> <span className="text-yellow-400">generateExplanation</span>(topic: <span className="text-green-400">str</span>):
    <br />
    {'  '}explanation = <span className="text-purple-400">await</span> ai.generate(&#123;
    <br />
    {'    '}prompt=f<span className="text-orange-400">"Explain &#123;topic&#125; simply."</span>
    <br />
    {'  '}&#125;)
    <br />
    {'  '}<span className="text-purple-400">return</span> explanation.text
  </>
);

const reactCode = (
  <>
    <span className="text-blue-400">const</span> [<span className="text-green-400">topic</span>, <span className="text-yellow-400">setTopic</span>] = <span className="text-yellow-400">useState</span>(<span className="text-orange-400">'AI'</span>);
    <br />
    <br />
    <span className="text-purple-400">return</span> (
    <br />
    {'  '}&lt;<span className="text-red-400">div</span>&gt;
    <br />
    {'    '}&lt;<span className="text-red-400">h1</span>&gt;&#123;<span className="text-green-400">topic</span>&#125;&lt;/<span className="text-red-400">h1</span>&gt;
    <br />
    {'  '}&lt;/<span className="text-red-400">div</span>&gt;
    <br />
    )
  </>
);

interface CodeSnippetProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'python' | 'react';
}

export function CodeSnippet({
  className,
  variant = 'python',
  ...props
}: CodeSnippetProps) {
  return (
    <div
      className={cn(
        'code-snippet relative w-64 rounded-lg bg-zinc-800/50 p-4 text-sm font-mono text-left shadow-2xl shadow-primary/20 backdrop-blur-sm transition-all duration-300 hover:shadow-primary/40',
        'dark:bg-zinc-900/70',
        className
      )}
      {...props}
    >
      <div className="absolute top-3 left-3 flex gap-1.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
      </div>
      <div className="mt-6 text-xs leading-relaxed tracking-wide">
        {variant === 'python' ? pythonCode : reactCode}
      </div>
    </div>
  );
}
