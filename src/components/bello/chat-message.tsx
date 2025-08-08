'use client';

import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ActionButtons from './action-buttons';
import CourseTopics from './course-topics';
import { Sparkles, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex items-start gap-4', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <Avatar className="h-10 w-10 border-2 border-primary">
          <AvatarImage src="https://placehold.co/100x100/3B5998/FFFFFF" data-ai-hint="robot face" alt="Mr. Bello" />
          <AvatarFallback>MB</AvatarFallback>
        </Avatar>
      )}
      <div className={cn(
          'max-w-xl rounded-lg px-4 py-3 shadow-md', 
          isUser ? 'bg-primary text-primary-foreground' : 'bg-card'
      )}>
        <div className="prose prose-p:leading-relaxed prose-p:m-0 prose-headings:m-0 prose-ul:m-0 prose-ol:m-0 prose-li:m-0 max-w-none">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>

        {message.funnyGesture && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-blue-100 p-2 text-sm text-blue-800">
                <Sparkles className="h-4 w-4 flex-shrink-0" />
                <p className="italic">{message.funnyGesture}</p>
            </div>
        )}

        {message.courseTopics && (
            <CourseTopics topics={message.courseTopics} />
        )}

        {message.topic && !message.isRefined && (
            <ActionButtons topic={message.topic} messageId={message.id}/>
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
