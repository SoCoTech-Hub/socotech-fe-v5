import type { Meta, StoryFn } from "@storybook/react";

import type { Subject } from "./subjects";
import Lessons from "./lessons";

export default {
  title: "LessonIntro/Lessons",
  component: Lessons,
} as Meta;

const sampleSubject: Subject = {
  id: "1",
  title: "Algebra",
  lessons: [
    { id: "1", title: "Linear Equations" },
    { id: "2", title: "Quadratic Equations" },
  ],
};

const Template: StoryFn = (args) => <Lessons {...args} />;

export const Default = Template.bind({});
Default.args = {
  selectedSubject: sampleSubject,
  handleBack: () => alert("Back to Subjects"),
  handleLessonSelect: (lesson) => alert(`Selected Lesson: ${lesson.title}`),
};
