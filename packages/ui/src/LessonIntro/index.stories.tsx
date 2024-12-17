import type { Meta, StoryFn } from "@storybook/react";

import type { SubjectCategory } from "./categories";
import SubjectHierarchy from "./";

export default {
  title: "LessonIntro/Page",
  component: SubjectHierarchy,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const sampleData: SubjectCategory[] = [
  {
    id: 1,
    title: "Mathematics",
    subjects: [
      {
        id: "1",
        title: "Algebra",
        lessons: [
          { id: "1", title: "Linear Equations" },
          { id: "2", title: "Quadratic Equations" },
        ],
      },
      {
        id: "2",
        title: "Geometry",
        lessons: [
          { id: "3", title: "Triangles" },
          { id: "4", title: "Circles" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Science",
    subjects: [
      {
        id: "3",
        title: "Physics",
        lessons: [
          { id: "5", title: "Newton's Laws" },
          { id: "6", title: "Thermodynamics" },
        ],
      },
      {
        id: "4",
        title: "Biology",
        lessons: [
          { id: "7", title: "Cell Structure" },
          { id: "8", title: "Genetics" },
        ],
      },
    ],
  },
];

const Template: StoryFn = (args) => <SubjectHierarchy {...args} />;

export const Default = Template.bind({});
Default.args = {
  categories: sampleData,
  onLessonSelect: (lesson, subject, category) =>
    alert(
      `Selected Lesson: ${lesson.title} in ${subject.title} (${category.title})`,
    ),
};
