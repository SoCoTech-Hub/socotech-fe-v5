import { ChevronLeft, ChevronRight } from "lucide-react";

import type { TourStep } from ".";
import { Button } from "../button";
import { CardFooter } from "../card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

export interface TourFooterProps {
  steps: TourStep[];
  currentStep: number;
  handlePrevious: () => void;
  handleNext: () => void;
  handleStepChange: (e: string) => void;
}
const TourFooter = (props: TourFooterProps) => (
  <CardFooter className="flex flex-col gap-2">
    <div className="flex w-full justify-between">
      <Button
        onClick={props.handlePrevious}
        disabled={props.currentStep === 0}
        variant="outline"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>
      <Button onClick={props.handleNext}>
        {props.currentStep === props.steps.length - 1 ? "Finish" : "Next"}
        {props.currentStep !== props.steps.length - 1 && (
          <ChevronRight className="ml-2 h-4 w-4" />
        )}
      </Button>
    </div>
    <Select
      onValueChange={props.handleStepChange}
      value={props.currentStep.toString()}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Go to step" />
      </SelectTrigger>
      <SelectContent>
        {props.steps.map((step, index) => (
          <SelectItem key={index} value={index.toString()}>
            {step.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </CardFooter>
);
export default TourFooter;
