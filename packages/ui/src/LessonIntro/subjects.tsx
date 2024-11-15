import { ArrowLeft } from "lucide-react";

import type { SubjectCategoryProps } from "./categories";
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
  selectedCategory: SubjectCategoryProps;
  handleBack: () => void;
  handleSubjectSelect: (subject: Subject) => void;
}
const Subjects = (props: SubjectsProps) => (
  <Card className="flex-1 m-4">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>Subjects in {props.selectedCategory.title}</CardTitle>
      <Button variant="ghost" onClick={props.handleBack}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          {props.selectedCategory.subjects.map((subject, index) => (
            <Card
              key={`subject-${index}`}
              className="h-32 overflow-hidden cursor-pointer"
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
              <CardContent className="flex items-center justify-center h-full">
                <span className="p-2 text-lg font-bold text-center text-white bg-black bg-opacity-50 rounded">
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
