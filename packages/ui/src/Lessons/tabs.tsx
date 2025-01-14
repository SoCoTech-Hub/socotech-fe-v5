import type { Subject } from "./card";
import { ScrollArea } from "../scroll-area";
import { Tabs, TabsList, TabsTrigger } from "../tabs";

export interface Grade {
  id: string;
  name: string;
  subjects: Subject[];
}

export interface ScrollTabsProps {
  grades: Grade[];
  selectedGrade: string;
  setSelectedGrade: (gradeId: string) => void;
}

export const ScrollTabs: React.FC<ScrollTabsProps> = ({
  grades,
  selectedGrade,
  setSelectedGrade,
}) => (
  <Tabs value={selectedGrade} onValueChange={setSelectedGrade}>
    <ScrollArea className="w-full">
      <TabsList className="w-full justify-start">
        {grades.map((grade) => (
          <TabsTrigger
            key={grade.id}
            value={grade.id}
            className="flex-shrink-0"
          >
            {grade.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </ScrollArea>
  </Tabs>
);
