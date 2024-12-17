import type { Meta, StoryFn } from "@storybook/react";

import CardSkeleton from "./skeleton";

export default {
  title: "Lesson/CardSkeleton",
  component: CardSkeleton,
} as Meta;

const Template: StoryFn = () => <CardSkeleton />;

export const DefaultSkeleton = Template.bind({});
