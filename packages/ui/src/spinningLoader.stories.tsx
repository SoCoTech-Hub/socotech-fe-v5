import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { SpinningLoaderProps } from "./spinningLoader";
import { SpinningLoader } from "./spinningLoader";

export default {
  title: "Loader/SpinningLoader",
  component: SpinningLoader,
} as Meta;

const Template: StoryFn<SpinningLoaderProps> = (args) => (
  <div className="flex h-screen items-center justify-center">
    <SpinningLoader {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: "md",
  color: "text-primary",
};

export const Small = Template.bind({});
Small.args = {
  size: "sm",
  color: "text-secondary",
};

export const Large = Template.bind({});
Large.args = {
  size: "lg",
  color: "text-accent",
};
