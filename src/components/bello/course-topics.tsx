'use client';

import { useContext } from 'react';
import { AppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface CourseTopicsProps {
  topics: string[];
}

export default function CourseTopics({ topics }: CourseTopicsProps) {
  const { startTopicFromCourse, isLoading } = useContext(AppContext);

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
