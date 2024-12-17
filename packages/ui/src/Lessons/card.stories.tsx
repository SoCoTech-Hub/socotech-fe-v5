import type { Meta, StoryFn } from "@storybook/react";

import type { Lesson, LessonCardProps, Subject } from "./card";
import LessonCard from "./card";

export default {
  title: "Lesson/Card",
  component: LessonCard,
} as Meta;

const Template: StoryFn<LessonCardProps> = (args) => <LessonCard {...args} />;

const sampleLesson: Lesson = {
  id: 1,
  title: "Introduction to Storybook",
  imageUrl: "https://via.placeholder.com/150",
};

const sampleSubject: Subject = {
  id: 1,
  name: "Frontend Development",
  imageUrl: "https://via.placeholder.com/150",
  lessons: [sampleLesson],
};

export const LessonExample = Template.bind({});
LessonExample.args = {
  item: sampleLesson,
  type: "lesson",
};

export const SubjectExample = Template.bind({});
SubjectExample.args = {
  item: sampleSubject,
  type: "subject",
};
