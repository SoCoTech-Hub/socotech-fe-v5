import { X } from "lucide-react";

import type { TourStep } from ".";
import { Button } from "../button";
import { CardTitle } from "../card";

export interface TourTitleProps {
  steps: TourStep[];
  handleClose: () => void;
  currentStep: number;
}
const TourTitle = (props: TourTitleProps) => (
  <CardTitle className="flex items-center justify-between">
    <span>{props.steps[props.currentStep]?.title}</span>
    <Button variant="ghost" size="icon" onClick={props.handleClose}>
      <X className="h-4 w-4" />
      <span className="sr-only">Close tour</span>
    </Button>
  </CardTitle>
);
export default TourTitle;
