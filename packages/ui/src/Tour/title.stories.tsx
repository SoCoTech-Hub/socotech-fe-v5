import type { Meta, StoryFn } from "@storybook/react";

import type { TourTitleProps } from "./title";
import TourTitle from "./title";

export default {
  title: "Tour/Title",
  component: TourTitle,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    handleClose: { action: "handleClose" },
  },
} as Meta<typeof TourTitle>;

const Template: StoryFn<TourTitleProps> = (args) => <TourTitle {...args} />;

export const Default = Template.bind({});
Default.args = {
  steps: [
    {
      target: "#step-1",
      title: "Welcome to the Tour",
      content: "",
      placement: "bottom",
    },
    {
      target: "#step-2",
      title: "Key Features",
      content: "",
      placement: "right",
    },
    { target: "#step-3", title: "Conclusion", content: "", placement: "left" },
  ],
  currentStep: 0,
};
