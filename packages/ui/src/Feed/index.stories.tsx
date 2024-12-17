import type { Meta, StoryFn } from "@storybook/react";

import Feed from ".";

export default {
  title: "Feed/index",
  component: Feed,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof Feed>;

const Template: StoryFn<typeof Feed> = () => <Feed />;

export const Default = Template.bind({});
Default.args = {};
