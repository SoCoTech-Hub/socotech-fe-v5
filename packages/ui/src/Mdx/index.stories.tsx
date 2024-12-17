import type { Meta, StoryFn } from "@storybook/react";

import MDX from "./index";

export default {
  title: "MDX/index",
  component: MDX,
} as Meta;

const Template: StoryFn = (args) => <MDX {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: "Hello, this is your initial content!",
};
