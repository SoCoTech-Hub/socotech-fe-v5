import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import ThemeLayout from "./themeLayout";
import { ThemeSwitcher } from "./themeToggle";

export default {
  title: "ThemeToggle",
  component: ThemeSwitcher,
} as Meta;

const Template: StoryFn = () => (
  <ThemeLayout>
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <ThemeSwitcher />
    </div>
  </ThemeLayout>
);

export const Default = Template.bind({});
Default.args = {};
