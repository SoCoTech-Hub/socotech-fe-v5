import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import type { Step } from ".";
import Paginate from "./paginate";

export default {
  title: "Wizard/Paginate",
  component: Paginate,
} as Meta;

const steps: Step[] = [
  { id: "step-1", title: "Step 1" },
  { id: "step-2", title: "Step 2" },
  { id: "step-3", title: "Step 3" },
];

const Template: StoryFn = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handlePrevious = () => {
    if (currentStepIndex > 0) setCurrentStepIndex(currentStepIndex - 1);
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1)
      setCurrentStepIndex(currentStepIndex + 1);
  };

  return (
    <Paginate
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      currentStepIndex={currentStepIndex}
      steps={steps}
    />
  );
};

export const Default = Template.bind({});
