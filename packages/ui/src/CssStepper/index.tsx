import React from "react";

// Define the prop types
interface CssStepperProps {
  step?: number;
}

const CssStepper: React.FC<CssStepperProps> = ({ step = 1 }) => {
  return (
    <div>
      <div className="stepperContainer">
        <div
          className={`step ${step === 1 ? "active" : step > 1 ? "completed" : ""}`}
        >
          <div className="v-stepper z-10">
            <div className="circle"></div>
            <div className="line"></div>
          </div>
          <div className="content">
            <div className="text-2xl font-bold text-gray-600">Step 1</div>
            <div className="heading text-gray-600">General Info</div>
          </div>
        </div>
        <div
          className={`step ${
            step === 2
              ? "active"
              : step < 2
                ? "opacity-50"
                : step > 2
                  ? "completed"
                  : ""
          }`}
        >
          <div className="v-stepper">
            <div className="circle"></div>
            <div className="line"></div>
          </div>
          <div className="content">
            <div className="text-2xl font-bold text-gray-600">Step 2</div>
            <div className="heading text-gray-600">School Info</div>
          </div>
        </div>
        <div
          className={`step ${
            step === 3
              ? "active"
              : step < 3
                ? "opacity-50"
                : step > 3
                  ? "completed"
                  : ""
          }`}
        >
          <div className="v-stepper">
            <div className="circle"></div>
            <div className="line"></div>
          </div>
          <div className="content flex">
            <div className="text-2xl font-bold text-gray-600">Step 3</div>
            <div className="heading text-gray-600">Next of kin Info</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CssStepper;
