import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { BackToTopProps } from "./backToTop";
import { BackToTop } from "./backToTop";

export default {
  title: "BackToTop",
  component: BackToTop,
} as Meta;

const Template: StoryFn<BackToTopProps> = (args) => (
  <div className="relative h-screen overflow-auto">
    <div style={{ height: "150vh", padding: "1rem" }}>
      <p>Scroll down to see the Back to Top button.</p>
      <BackToTop {...args} />
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  threshold: 300,
};

export const CustomThreshold = Template.bind({});
CustomThreshold.args = {
  threshold: 100,
  className: "bg-primary text-white hover:bg-secondary",
};
