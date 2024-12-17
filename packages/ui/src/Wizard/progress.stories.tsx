import type { Meta, StoryFn } from "@storybook/react";

import type { Step } from ".";
import Progress from "./progress";

export default {
  title: "Wizard/Progress",
  component: Progress,
} as Meta;

const steps: Step[] = [
  { id: "step-1", title: "Step 1", description: "This is the first step." },
  { id: "step-2", title: "Step 2", description: "This is the second step." },
  { id: "step-3", title: "Step 3", description: "This is the final step." },
];

const Template: StoryFn = (args) => (
  <Progress currentStepIndex={0} steps={steps} className="" {...args} />
);

export const Default = Template.bind({});
Default.args = {
  currentStepIndex: 1,
  steps,
};
