import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { LessonContentProps } from "./content";
import LessonContent from "./content";

export default {
  title: "Lesson/Content",
  component: LessonContent,
} as Meta;

const Template: StoryFn<LessonContentProps> = (args) => (
  <LessonContent {...args} />
);

export const VideoOnlyExample = Template.bind({});
VideoOnlyExample.args = {
  subject: "Mathematics",
  title: "Introduction to Algebra",
  hasQuiz: false,
};

export const VideoWithQuizExample = Template.bind({});
VideoWithQuizExample.args = {
  subject: "Science",
  title: "Basics of Chemistry",
  hasQuiz: true,
};
