// import React from "react";

// // Define the prop types
// interface CssStepperProps {
//   step?: number;
// }

// const CssStepper: React.FC<CssStepperProps> = ({ step = 1 }) => {
//   return (
//     <div>
//       <div className="stepperContainer">
//         <div
//           className={`step ${step === 1 ? "active" : step > 1 ? "completed" : ""}`}
//         >
//           <div className="v-stepper z-10">
//             <div className="circle"></div>
//             <div className="line"></div>
//           </div>
//           <div className="content">
//             <div className="text-2xl font-bold text-gray-600">Step 1</div>
//             <div className="heading text-gray-600">General Info</div>
//           </div>
//         </div>
//         <div
//           className={`step ${
//             step === 2
//               ? "active"
//               : step < 2
//                 ? "opacity-50"
//                 : step > 2
//                   ? "completed"
//                   : ""
//           }`}
//         >
//           <div className="v-stepper">
//             <div className="circle"></div>
//             <div className="line"></div>
//           </div>
//           <div className="content">
//             <div className="text-2xl font-bold text-gray-600">Step 2</div>
//             <div className="heading text-gray-600">School Info</div>
//           </div>
//         </div>
//         <div
//           className={`step ${
//             step === 3
//               ? "active"
//               : step < 3
//                 ? "opacity-50"
//                 : step > 3
//                   ? "completed"
//                   : ""
//           }`}
//         >
//           <div className="v-stepper">
//             <div className="circle"></div>
//             <div className="line"></div>
//           </div>
//           <div className="content flex">
//             <div className="text-2xl font-bold text-gray-600">Step 3</div>
//             <div className="heading text-gray-600">Next of kin Info</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CssStepper;

import React from "react";

import { cn } from "@acme/ui";

interface Step {
  label: string;
  description?: string;
}

interface CssStepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export default function CssStepper({
  steps,
  currentStep,
  className,
}: CssStepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <ol className="flex w-full items-center">
        {steps.map((step, index) => (
          <li
            key={step.label}
            className={cn(
              "flex items-center space-x-2.5 text-blue-600 dark:text-blue-500",
              index < steps.length - 1 ? "w-full" : "",
              index < currentStep ? "text-blue-600" : "text-gray-500",
            )}
          >
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                index < currentStep ? "border-blue-600" : "border-gray-500",
              )}
            >
              {index < currentStep ? (
                <svg
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </span>
            <span>
              <h3 className="font-medium leading-tight">{step.label}</h3>
              {step.description && (
                <p className="text-sm">{step.description}</p>
              )}
            </span>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-full border-b",
                  index < currentStep - 1
                    ? "border-blue-600"
                    : "border-gray-300",
                )}
              ></div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
