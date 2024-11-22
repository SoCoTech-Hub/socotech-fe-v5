import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { Step } from "./";
import { Button } from "../button";
import { Wizard } from "./";

export default {
  title: "Wizard/Wizard",
  component: Wizard,
} as Meta;

const steps: Step[] = [
  {
    id: "step-1",
    title: "Personal Information",
    description: "Enter your personal details",
    component: (
      <div>
        <p className="mb-4">This is Step 1: Personal Information.</p>
        <Button>Fill Details</Button>
      </div>
    ),
  },
  {
    id: "step-2",
    title: "Address Details",
    description: "Provide your address",
    component: (
      <div>
        <p className="mb-4">This is Step 2: Address Details.</p>
        <Button>Save Address</Button>
      </div>
    ),
  },
  {
    id: "step-3",
    title: "Payment Information",
    description: "Add your payment methods",
    component: (
      <div>
        <p className="mb-4">This is Step 3: Payment Information.</p>
        <Button>Enter Payment</Button>
      </div>
    ),
  },
  {
    id: "step-4",
    title: "Confirmation",
    description: "Review and confirm your details",
    component: (
      <div>
        <p className="mb-4">This is Step 4: Confirmation.</p>
        <Button>Confirm</Button>
      </div>
    ),
  },
];

const Template: StoryFn = (args) => <Wizard {...args} />;

export const Default = Template.bind({});
Default.args = {
  steps,
  onComplete: () => alert("Wizard completed!"),
};
