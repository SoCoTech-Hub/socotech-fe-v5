import type { Step } from ".";
import { cn } from "../utils";

export interface ProgressProps {
  currentStepIndex: number;
  steps: Step[];
  className?: string;
}

export const Progress = ({
  currentStepIndex,
  steps,
  className,
}: ProgressProps) => {
  return (
    <nav aria-label="Progress" className={className}>
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, index) => (
          <li key={step.id} className="md:flex-1">
            <div
              className={cn(
                "group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                index <= currentStepIndex
                  ? "border-primary"
                  : "border-muted-foreground",
              )}
              aria-current={index === currentStepIndex ? "step" : undefined}
            >
              <span
                className={cn(
                  "text-sm font-medium",
                  index <= currentStepIndex
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                Step {index + 1}
              </span>
              <span className="text-sm font-medium">{step.title}</span>
              {step.description && (
                <span className="text-sm text-muted-foreground">
                  {step.description}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
