'use client';

import { useEffect, useRef, useState } from 'react';
import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ActionButtons from './action-buttons';
import CourseTopics from './course-topics';
import QuizDisplay from './quiz-display';
import { Sparkles, User, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import mermaid from 'mermaid';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '../ui/button';
import { useToast } from '@/hooks/use-toast';


mermaid.initialize({ startOnLoad: false, theme: 'neutral' });

const TableRenderer = ({ markdown }: { markdown: string }) => {
  const tableData = markdown
    .split('\n')
    .filter(row => row.trim() && !row.includes('---'))
    .map(row => row.split('|').map(cell => cell.trim()).filter(Boolean));

  if (tableData.length < 2) return <ReactMarkdown>{markdown}</ReactMarkdown>;

  const header = tableData[0];
  const rows = tableData.slice(1);

  return (
    <div className="my-4 rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {header.map((head, index) => <TableHead key={index}>{head}</TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => <TableCell key={cellIndex}>{cell}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};


export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  const diagramRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (message.diagram && diagramRef.current) {
        mermaid.run({
            nodes: [diagramRef.current],
        });
    }
  }, [message.diagram]);

  const handleCopy = () => {
    let textToCopy = message.content;
    if (message.table) {
      textToCopy += `\n\n${message.table}`;
    }
    if (message.diagram) {
        textToCopy += `\n\nDiagram (Mermaid Syntax):\n${message.diagram}`;
    }
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      toast({ title: "Copied to clipboard!" });
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast({ variant: 'destructive', title: "Failed to copy" });
    });
  };

  return (
    <div className={cn(
      'group/message flex items-start gap-3 sm:gap-4 animate-in fade-in-0', 
      isUser ? 'justify-end' : 'justify-start'
    )}>
      {!isUser && (
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-white shadow-md">
          <AvatarImage src="/mr-bello.png" alt="Mr. Bello Avatar" />
          <AvatarFallback>MB</AvatarFallback>
        </Avatar>
      )}
      <div className={cn(
          'relative max-w-xl rounded-2xl px-4 py-3 shadow-md', 
          isUser 
            ? 'bg-primary text-primary-foreground rounded-br-lg' 
            : 'bg-card text-card-foreground border rounded-bl-lg'
      )}>

        {!isUser && (
             <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7 text-muted-foreground opacity-0 transition-opacity group-hover/message:opacity-100"
                onClick={handleCopy}
            >
                {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy</span>
            </Button>
        )}
       
        <div ref={contentRef}>
            <div className="prose prose-p:leading-relaxed prose-p:m-0 prose-headings:m-0 prose-ul:m-0 prose-ol:m-0 prose-li:m-0 max-w-none text-base">
            <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>

            {message.table && <TableRenderer markdown={message.table} />}

            {message.diagram && (
                <div className="mt-4 p-4 bg-muted rounded">
                    <div ref={diagramRef} className="mermaid">
                        {message.diagram}
                    </div>
                </div>
            )}
            
            {message.quizQuestions && <QuizDisplay questions={message.quizQuestions} />}

            {message.funnyGesture && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary/10 p-2 text-sm text-primary/80">
                    <Sparkles className="h-4 w-4 flex-shrink-0" />
                    <p className="italic">{message.funnyGesture}</p>
                </div>
            )}
        </div>


        {message.courseTopics && (
            <CourseTopics topics={message.courseTopics} />
        )}

        {message.topic && (
            <ActionButtons topic={message.topic} content={message.content} contentRef={contentRef} />
        )}
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-white shadow-md">
          <AvatarImage src="" alt="User" />
          <AvatarFallback><User /></AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
