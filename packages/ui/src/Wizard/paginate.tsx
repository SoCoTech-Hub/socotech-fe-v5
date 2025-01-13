import { ChevronRight } from "lucide-react";

import type { Step } from ".";
import { Button } from "../button";
import { cn } from "../utils";

export interface PaginateProps {
  handlePrevious: () => void;
  currentStepIndex: number;
  handleNext: () => void;
  steps: Step[];
  className?: string;
}

const Paginate = ({
  handlePrevious,
  currentStepIndex,
  handleNext,
  steps,
  className,
}: PaginateProps) => {
  return (
    <div className={cn("mt-8 flex justify-between", className)}>
      <Button
        onClick={handlePrevious}
        disabled={currentStepIndex === 0}
        variant="outline"
        aria-disabled={currentStepIndex === 0}
      >
        Previous
      </Button>
      <Button
        onClick={handleNext}
        aria-disabled={currentStepIndex === steps.length - 1}
      >
        {currentStepIndex === steps.length - 1 ? "Complete" : "Next"}
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default Paginate;
