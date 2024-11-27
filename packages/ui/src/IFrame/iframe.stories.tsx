import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { IFrameProps } from "./index";
import { IFrame } from "./index";

export default {
  title: "IFrame",
  component: IFrame,
} as Meta;

const Template: StoryFn<IFrameProps> = (args) => <IFrame {...args} />;

export const DefaultIFrame = Template.bind({});
DefaultIFrame.args = {
  src: "https://www.example.com",
  title: "Example IFrame",
  width: "100%",
  height: "400px",
  allowFullScreen: true,
};
