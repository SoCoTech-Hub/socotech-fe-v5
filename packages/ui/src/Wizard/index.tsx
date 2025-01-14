"use client";

import { useState } from "react";

import { Paginate } from "./paginate";
import { Progress } from "./progress";

export interface Step {
  id: string;
  title: string;
  description?: string;
  component?: React.ReactNode;
}

interface WizardProps {
  steps: Step[];
  onComplete: () => void;
}

export function Wizard({ steps, onComplete }: WizardProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <div className="space-y-8">
      <Progress currentStepIndex={currentStepIndex} steps={steps} />
      {steps[currentStepIndex] && (
        <div className="mt-8 rounded-lg border p-4">
          {steps[currentStepIndex].component}
        </div>
      )}
      <Paginate
        handlePrevious={handlePrevious}
        currentStepIndex={currentStepIndex}
        handleNext={handleNext}
        steps={steps}
      />
    </div>
  );
}
