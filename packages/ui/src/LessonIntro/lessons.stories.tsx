import type { Meta, StoryFn } from "@storybook/react";

import { Lessons, LessonsProps } from "./lessons";

export default {
  title: "Components/Lessons",
  component: Lessons,
  argTypes: {
    handleBack: { action: "Back Button Clicked" },
    handleLessonSelect: { action: "Lesson Selected" },
  },
} as Meta;

const Template: StoryFn<LessonsProps> = (args) => (
  <div style={{ height: "100vh", padding: "1rem" }}>
    <Lessons {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  selectedSubject: {
    id: "math",
    title: "Mathematics",
    lessons: [
      { id: "lesson1", title: "Introduction to Algebra" },
      { id: "lesson2", title: "Quadratic Equations" },
      { id: "lesson3", title: "Basics of Geometry" },
    ],
  },
};
