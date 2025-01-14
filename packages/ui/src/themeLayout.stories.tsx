import type { Meta, StoryFn } from "@storybook/react";

import { RootLayout } from "./themeLayout";

export default {
  title: "RootLayout",
  component: RootLayout,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: StoryFn = (args) => <RootLayout {...args} children />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Hello, World!
      </h1>
    </div>
  ),
};
