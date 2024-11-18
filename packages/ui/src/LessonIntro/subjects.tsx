import { ArrowLeft } from "lucide-react";

import type { SubjectCategory } from "./categories";
import type { Lesson } from "./lessons";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { ScrollArea } from "../scroll-area";

export interface Subject {
  id: string;
  title: string;
  lessons: Lesson[];
  image?: string;
  color?: string;
}
export interface SubjectsProps {
  selectedCategory: SubjectCategory;
  handleBack: () => void;
  handleSubjectSelect: (subject: Subject) => void;
}
const Subjects = (props: SubjectsProps) => (
  <Card className="m-4 flex-1">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>Subjects in {props.selectedCategory.title}</CardTitle>
      <Button variant="ghost" onClick={props.handleBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          {props.selectedCategory.subjects.map((subject, index) => (
            <Card
              key={`subject-${index}`}
              className="h-32 cursor-pointer overflow-hidden"
              style={{
                backgroundImage: subject.image
                  ? `url(${subject.image})`
                  : undefined,
                backgroundColor: subject.color ?? "var(--card-background)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => props.handleSubjectSelect(subject)}
            >
              <CardContent className="flex h-full items-center justify-center">
                <span className="rounded bg-black bg-opacity-50 p-2 text-center text-lg font-bold text-white">
                  {subject.title}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
);
export default Subjects;
