"use client";

import React, { useEffect, useState } from "react";

import { Card, CardContent, CardHeader } from "../card";
import TourFooter from "./footer";
import TourTitle from "./title";

export interface TourStep {
  target: string;
  title: string;
  content: string;
  placement: "top" | "right" | "bottom" | "left";
}

export interface TourGuideProps {
  steps: TourStep[];
  onComplete: () => void;
}

export default function TourGuide({ steps, onComplete }: TourGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const updatePosition = () => {
      const step = steps[currentStep];
      if (!step) return;

      const targetElement = document.querySelector(step.target);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const { placement = "bottom" } = step;
        let top = rect.bottom + window.scrollY;
        let left = rect.left + window.scrollX;

        switch (placement) {
          case "top":
            top = rect.top + window.scrollY - 10;
            break;
          case "right":
            left = rect.right + window.scrollX + 10;
            top = rect.top + window.scrollY;
            break;
          case "left":
            left = rect.left + window.scrollX - 310;
            top = rect.top + window.scrollY;
            break;
        }

        setPosition({ top, left });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [currentStep, steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    onComplete();
  };

  const handleStepChange = (value: string) => {
    const stepIndex = parseInt(value, 10);
    if (!isNaN(stepIndex) && stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex);
    }
  };

  const currentStepData = steps[currentStep];

  if (!currentStepData) {
    return null; // Handle the case where the current step is invalid
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card
        className="absolute w-80 shadow-lg"
        style={{ top: `${position.top}px`, left: `${position.left}px` }}
      >
        <CardHeader>
          <TourTitle
            currentStep={currentStep}
            handleClose={handleClose}
            steps={steps}
          />
        </CardHeader>
        <CardContent>
          <p>{currentStepData.content}</p>
        </CardContent>
        <TourFooter
          steps={steps}
          currentStep={currentStep}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handleStepChange={handleStepChange}
        />
      </Card>
    </div>
  );
}
