import React from "react";
import { ArrowLeft, BookOpen } from "lucide-react";

import type { Subject } from "./subjects";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { ScrollArea } from "../scroll-area";

export interface Lesson {
  id: string;
  title: string;
}
export interface LessonsProps {
  selectedSubject: Subject;
  handleBack: () => void;
  handleLessonSelect: (lesson: Lesson) => void;
}
const Lessons = (props: LessonsProps) => (
  <Card className="m-4 flex-1">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>Lessons in {props.selectedSubject.title}</CardTitle>
      <Button variant="ghost" onClick={props.handleBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="space-y-2">
          {props.selectedSubject.lessons.map((lesson: Lesson) => (
            <Button
              key={lesson.id}
              variant="outline"
              className="w-full justify-start"
              onClick={() => props.handleLessonSelect(lesson)}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              {lesson.title}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
);
export default Lessons;
