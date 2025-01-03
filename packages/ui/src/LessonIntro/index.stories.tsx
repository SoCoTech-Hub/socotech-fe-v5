import type { Meta, StoryFn } from "@storybook/react";

import SubjectHierarchy, { SubjectHierarchyProps } from ".";

export default {
  title: "Components/SubjectHierarchy",
  component: SubjectHierarchy,
  argTypes: {
    onLessonSelect: { action: "Lesson Selected" },
  },
} as Meta;

const Template: StoryFn<SubjectHierarchyProps> = (args) => (
  <div style={{ height: "100vh" }}>
    <SubjectHierarchy {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  categories: [
    {
      id: 1,
      title: "Mathematics",
      subjects: [
        {
          id: "algebra",
          title: "Algebra",
          lessons: [
            { id: "lesson1", title: "Introduction to Algebra" },
            { id: "lesson2", title: "Quadratic Equations" },
          ],
          image: "https://via.placeholder.com/150",
          color: "#f0f8ff",
        },
        {
          id: "geometry",
          title: "Geometry",
          lessons: [
            { id: "lesson3", title: "Basics of Geometry" },
            { id: "lesson4", title: "Triangles and Angles" },
          ],
          color: "#ffebcd",
        },
      ],
    },
    {
      id: 2,
      title: "Science",
      subjects: [
        {
          id: "physics",
          title: "Physics",
          lessons: [
            { id: "lesson5", title: "Newton's Laws" },
            { id: "lesson6", title: "Energy and Motion" },
          ],
          image: "https://via.placeholder.com/150",
        },
        {
          id: "biology",
          title: "Biology",
          lessons: [
            { id: "lesson7", title: "Cell Structure" },
            { id: "lesson8", title: "Genetics" },
          ],
        },
      ],
    },
  ],
};
