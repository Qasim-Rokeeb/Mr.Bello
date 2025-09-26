'use client';

import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface CourseTopicsProps {
  topics: string[];
}

export default function CourseTopics({ topics }: CourseTopicsProps) {
  const { startTopicFromCourse, isLoading } = useContext(AppContext);

  if (isLoading && topics.length === 0) {
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
    <div className="mt-4 flex flex-col gap-2 border-t pt-3">
        <h4 className="font-semibold text-md mb-1">Course Modules:</h4>
        {topics.map((topic, index) => (
            <Button
                key={index}
                variant="ghost"
                className="justify-start text-left h-auto p-2 hover:bg-primary/10"
                onClick={() => startTopicFromCourse(topic)}
                disabled={isLoading}
            >
                <ChevronRight className="h-4 w-4 mr-2 text-primary" />
                {topic}
            </Button>
        ))}
    </div>
  );
}
