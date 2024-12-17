import type { Meta, StoryFn } from "@storybook/react";

import type { TourFooterProps } from "./footer";
import TourFooter from "./footer";

export default {
  title: "Tour/Footer",
  component: TourFooter,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    handleNext: { action: "handleNext" },
    handlePrevious: { action: "handlePrevious" },
    handleStepChange: { action: "handleStepChange" },
  },
} as Meta<typeof TourFooter>;

const Template: StoryFn<TourFooterProps> = (args) => <TourFooter {...args} />;

export const Default = Template.bind({});
Default.args = {
  steps: [
    { target: "#step-1", title: "Step 1", content: "", placement: "bottom" },
    { target: "#step-2", title: "Step 2", content: "", placement: "right" },
    { target: "#step-3", title: "Step 3", content: "", placement: "left" },
  ],
  currentStep: 0,
};
