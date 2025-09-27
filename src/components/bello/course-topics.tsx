'use client';

import { useContext, useState } from 'react';
import { AppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { ChevronRight, LoaderCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ReactMarkdown from 'react-markdown';
import { ScrollArea } from '../ui/scroll-area';

interface CourseTopicsProps {
  topics: string[];
}

export default function CourseTopics({ topics }: CourseTopicsProps) {
  const { startTopicFromCourse, isLoading: isAppLoading } = useContext(AppContext);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [topicContent, setTopicContent] = useState<string | null>(null);
  const [isTopicLoading, setIsTopicLoading] = useState(false);

  const handleTopicClick = async (topic: string) => {
    setSelectedTopic(topic);
    setIsTopicLoading(true);
    const content = await startTopicFromCourse(topic, true);
    if (content) {
      setTopicContent(content);
    }
    setIsTopicLoading(false);
  };

  const handleSheetClose = () => {
    setSelectedTopic(null);
    setTopicContent(null);
  };

  if (isAppLoading && topics.length === 0) {
    return (
      <div className="mt-4 flex flex-col gap-2 border-t pt-3">
        <h4 className="font-semibold text-md mb-1">Course Modules:</h4>
        {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center p-2">
                <Skeleton className="h-4 w-4 mr-2" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mt-4 flex flex-col gap-2 border-t pt-3">
          <h4 className="font-semibold text-md mb-1">Course Modules:</h4>
          {topics.map((topic, index) => (
              <Button
                  key={index}
                  variant="ghost"
                  className="justify-start text-left h-auto p-2 hover:bg-primary/10"
                  onClick={() => handleTopicClick(topic)}
                  disabled={isAppLoading || isTopicLoading}
              >
                  <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                  {topic}
              </Button>
          ))}
      </div>
      <Sheet open={!!selectedTopic} onOpenChange={(isOpen) => !isOpen && handleSheetClose()}>
        <SheetContent side="bottom" className="h-[85vh] flex flex-col">
          <SheetHeader>
            <SheetTitle>{selectedTopic}</SheetTitle>
            <SheetDescription>
              An explanation from Mr. Bello.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="flex-1 -mx-6 px-6">
            {isTopicLoading ? (
              <div className="space-y-4 py-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
              </div>
            ) : (
                <div className="prose dark:prose-invert py-4">
                    <ReactMarkdown>{topicContent || ''}</ReactMarkdown>
                </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
