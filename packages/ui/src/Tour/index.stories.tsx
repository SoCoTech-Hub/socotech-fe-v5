import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { TourGuideProps } from ".";
import TourGuide from ".";

export default {
  title: "Tour/Guide",
  component: TourGuide,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onComplete: { action: "onComplete" },
  },
} as Meta<typeof TourGuide>;

const Template: StoryFn<TourGuideProps> = (args) => <TourGuide {...args} />;

export const Default = Template.bind({});
Default.args = {
  steps: [
    {
      target: "#step-1",
      title: "Welcome to the Tour",
      content: "This is the first step of the tour.",
      placement: "bottom",
    },
    {
      target: "#step-2",
      title: "Key Features",
      content: "Here we highlight some key features.",
      placement: "right",
    },
    {
      target: "#step-3",
      title: "Conclusion",
      content: "This is the last step of the tour. Enjoy!",
      placement: "left",
    },
  ],
};
