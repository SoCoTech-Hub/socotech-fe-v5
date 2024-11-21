import type { Meta, StoryFn } from "@storybook/react";
import React, { useState } from "react";

import type { AlertProps } from "./index";
import { Button } from "../button";
import { PopupAlert } from "./index";

export default {
  title: "Components/Alert",
  component: PopupAlert,
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["default", "destructive", "success"],
      },
    },
    duration: {
      control: { type: "number" },
    },
    message: {
      control: { type: "text" },
    },
  },
} as Meta<AlertProps>;

const Template: StoryFn<AlertProps> = (args) => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div>
      <Button onClick={() => setShowAlert(true)} className="mb-4">
        Show Alert
      </Button>
      {showAlert && (
        <PopupAlert {...args} onClose={() => setShowAlert(false)} />
      )}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  variant: "default",
  message: "This is a default alert.",
  duration: 5000,
};

export const Destructive = Template.bind({});
Destructive.args = {
  variant: "destructive",
  message: "This is a destructive alert.",
  duration: 5000,
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
  message: "This is a success alert.",
  duration: 5000,
};
