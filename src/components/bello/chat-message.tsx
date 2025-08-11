
'use client';

import { useEffect, useRef } from 'react';
import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ActionButtons from './action-buttons';
import CourseTopics from './course-topics';
import { Sparkles, User } from 'lucide-react';
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

  useEffect(() => {
    if (message.diagram && diagramRef.current) {
        mermaid.run({
            nodes: [diagramRef.current],
        });
    }
  }, [message.diagram]);

  return (
    <div className={cn(
      'flex items-start gap-4 animate-in fade-in-0', 
      isUser ? 'justify-end slide-in-from-right-8' : 'justify-start slide-in-from-left-8'
    )}>
      {!isUser && (
        <Avatar className="h-10 w-10 border-2 border-primary">
          <AvatarImage src="/mr-bello.png" alt="Mr. Bello Avatar" />
          <AvatarFallback>MB</AvatarFallback>
        </Avatar>
      )}
      <div className={cn(
          'max-w-xl rounded-lg px-4 py-3 shadow-md', 
          isUser ? 'bg-primary text-primary-foreground' : 'bg-card'
      )}>
        <div ref={contentRef}>
            <div className="prose prose-p:leading-relaxed prose-p:m-0 prose-headings:m-0 prose-ul:m-0 prose-ol:m-0 prose-li:m-0 max-w-none">
            <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>

            {message.table && <TableRenderer markdown={message.table} />}

            {message.diagram && (
                <div className="mt-4 p-4 bg-gray-100 rounded">
                    <div ref={diagramRef} className="mermaid">
                        {message.diagram}
                    </div>
                </div>
            )}

            {message.funnyGesture && (
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-blue-100 p-2 text-sm text-blue-800">
                    <Sparkles className="h-4 w-4 flex-shrink-0" />
                    <p className="italic">{message.funnyGesture}</p>
                </div>
            )}
        </div>


        {message.courseTopics && (
            <CourseTopics topics={message.courseTopics} />
        )}

        {message.topic && (
            <ActionButtons topic={message.topic} contentRef={contentRef} />
        )}
      </div>
      {isUser && (
        <Avatar className="h-10 w-10 border-2 border-secondary">
          <AvatarImage src="" alt="User" />
          <AvatarFallback><User /></AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
