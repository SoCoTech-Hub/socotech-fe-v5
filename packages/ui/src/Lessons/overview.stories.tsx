import type { Meta, StoryFn } from "@storybook/react";

import type { LessonOverviewProps } from "./overview";
import { LessonOverview } from "./overview";

export default {
  title: "Lesson/LessonOverview",
  component: LessonOverview,
} as Meta;

const Template: StoryFn<LessonOverviewProps> = (args) => (
  <LessonOverview {...args} />
);

export const DefaultOverview = Template.bind({});
DefaultOverview.args = {
  overview:
    "This lesson will cover the basics of algebra, including variables, equations, and simple problem-solving techniques.",
  duration: "45 minutes",
  presenter: "John Doe",
};
