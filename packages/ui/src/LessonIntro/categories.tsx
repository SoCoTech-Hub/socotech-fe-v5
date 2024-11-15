import { ChevronRight } from "lucide-react";

import type { SubjectProps } from "./subjects";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { ScrollArea } from "../scroll-area";

export interface SubjectCategoryProps {
  id: number;
  title: string;
  subjects: SubjectProps[];
}

export interface SubjectCategoriesProps {
  categories: SubjectCategoryProps[];
  selectedCategory?: SubjectCategoryProps;
  handleCategorySelect: (category: SubjectCategoryProps) => void;
}
const SubjectCategories = (props: SubjectCategoriesProps) => (
  <Card className="m-4 flex-1">
    <CardHeader>
      <CardTitle>Categories</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          {props.categories.map((category) => (
            <Button
              key={category.id}
              variant={
                props.selectedCategory?.id === category.id
                  ? "default"
                  : "outline"
              }
              className="h-24 w-full justify-start"
              onClick={() => props.handleCategorySelect(category)}
            >
              <ChevronRight className="mr-2 h-4 w-4" />
              {category.title}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
);
export default SubjectCategories;
