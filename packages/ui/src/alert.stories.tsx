import type { Meta, StoryFn } from "@storybook/react";

import { Alert, AlertDescription, AlertTitle } from "./alert";

export default {
  title: "Alert",
  component: Alert,
} as Meta;

const Template: StoryFn = (args) => (
  <Alert {...args}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 6.75v6m0 3.75h.008v-.008H11.25v.008z"
      />
    </svg>
    <div>
      <AlertTitle>Alert Title</AlertTitle>
      <AlertDescription>
        This is an alert description providing additional context about the
        alert.
      </AlertDescription>
    </div>
  </Alert>
);

export const Default = Template.bind({});
Default.args = {
  variant: "default",
};

export const Destructive = Template.bind({});
Destructive.args = {
  variant: "destructive",
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
};

export const Warning = Template.bind({});
Warning.args = {
  variant: "warning",
};
