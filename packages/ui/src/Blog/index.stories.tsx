import type { Meta, StoryFn } from "@storybook/react";

import Blog from ".";

export default {
  title: "Blog/index",
  component: Blog,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof Blog>;

const Template: StoryFn<typeof Blog> = () => <Blog />;

export const Default = Template.bind({});
Default.args = {};
