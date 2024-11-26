import type { Meta, StoryFn } from "@storybook/react";
import React, { useState } from "react";

import { PopupAlert } from "./index";

export default {
  title: "Alert/PopupAlert",
  component: PopupAlert,
} as Meta;

const Template: StoryFn = (args) => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <button
        className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => setVisible(true)}
      >
        Show Alert
      </button>
      <PopupAlert
        message={""}
        {...args}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  message: "This is a default alert.",
  variant: "default",
  duration: 5000,
  position: "bottom-right",
};

export const Destructive = Template.bind({});
Destructive.args = {
  message: "This is a destructive alert.",
  variant: "destructive",
  duration: 5000,
  position: "top-right",
};

export const Success = Template.bind({});
Success.args = {
  message: "This is a success alert.",
  variant: "success",
  duration: 3000,
  position: "bottom-left",
};
