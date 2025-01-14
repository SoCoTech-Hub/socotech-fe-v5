import type { Meta, StoryFn } from "@storybook/react";

import type { HeaderSectionProps } from "./viewHeader";
import { HeaderSection } from "./viewHeader";

export default {
  title: "Lesson/HeaderSection",
  component: HeaderSection,
} as Meta;

const Template: StoryFn<HeaderSectionProps> = (args) => (
  <HeaderSection {...args} />
);

export const DefaultHeader = Template.bind({});
DefaultHeader.args = {
  subject: "Mathematics",
  title: "Introduction to Algebra",
};
