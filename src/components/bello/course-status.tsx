'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { RadialProgress } from "@/components/ui/radial-progress";
import { Check, BookCheck } from "lucide-react";
import type { Course } from "@/lib/types";
import { cn } from "@/lib/utils";


export default function CourseStatus({ course }: { course: Course }) {
  const completedTopics = course.topics.filter(t => t.completed).length;
  const totalTopics = course.topics.length;
  const progress = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9">
            <BookCheck className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Course Progress</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">My Course Progress</h4>
            <p className="text-sm text-muted-foreground">
              {course.name}
            </p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
                <p className="text-sm font-medium">{completedTopics} of {totalTopics} topics completed</p>
                <ul className="mt-2 space-y-2 text-sm max-h-48 overflow-y-auto">
                    {course.topics.map(topic => (
                        <li key={topic.title} className="flex items-center gap-2">
                            <Check className={cn("h-4 w-4", topic.completed ? "text-green-500" : "text-muted-foreground/50")} />
                            <span className={cn(topic.completed && "line-through text-muted-foreground")}>{topic.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <RadialProgress value={progress} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
