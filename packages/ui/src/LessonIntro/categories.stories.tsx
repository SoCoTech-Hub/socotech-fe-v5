import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import SubjectCategories, {
  SubjectCategoriesProps,
  SubjectCategory,
} from "./categories";

export default {
  title: "LessonIntro/SubjectCategories",
  component: SubjectCategories,
  argTypes: {
    handleCategorySelect: { action: "category selected" },
  },
} as Meta;

const Template: StoryFn<SubjectCategoriesProps> = (args) => {
  const [selectedCategory, setSelectedCategory] = useState<
    SubjectCategory | undefined
  >(args.selectedCategory);

  const handleCategorySelect = (category: SubjectCategory) => {
    setSelectedCategory(category);
    args.handleCategorySelect(category);
  };

  return (
    <SubjectCategories
      {...args}
      selectedCategory={selectedCategory}
      handleCategorySelect={handleCategorySelect}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  categories: [
    {
      id: 1,
      title: "Mathematics",
      subjects: [
        {
          id: "math1",
          title: "Algebra",
          lessons: [
            { id: "lesson1", title: "Introduction to Algebra" },
            { id: "lesson2", title: "Quadratic Equations" },
          ],
        },
        {
          id: "math2",
          title: "Geometry",
          lessons: [
            { id: "lesson3", title: "Basics of Geometry" },
            { id: "lesson4", title: "Triangles and Angles" },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Science",
      subjects: [
        {
          id: "science1",
          title: "Physics",
          lessons: [
            { id: "lesson5", title: "Newton's Laws" },
            { id: "lesson6", title: "Energy and Motion" },
          ],
        },
        {
          id: "science2",
          title: "Biology",
          lessons: [
            { id: "lesson7", title: "Cell Structure" },
            { id: "lesson8", title: "Genetics" },
          ],
        },
      ],
    },
  ],
  selectedCategory: undefined,
};
