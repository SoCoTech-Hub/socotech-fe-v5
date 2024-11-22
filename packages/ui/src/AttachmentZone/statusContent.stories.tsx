import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { StatusContentProps } from "./statusContent";
import StatusContent from "./statusContent";

export default {
  title: "Attachments/StatusContent",
  component: StatusContent,
} as Meta;

const Template: StoryFn<StatusContentProps> = (args) => (
  <div className="flex h-64 w-full items-center justify-center bg-gray-100 p-4">
    <StatusContent {...args} />
  </div>
);

export const Idle = Template.bind({});
Idle.args = {
  uploadStatus: "idle",
  acceptedFileTypes: ["image/*", "application/pdf"],
  maxSize: 5242880,
};

export const Uploading = Template.bind({});
Uploading.args = {
  uploadStatus: "uploading",
  uploadProgress: 45,
  acceptedFileTypes: ["image/*", "application/pdf"],
  maxSize: 5242880,
};

export const Success = Template.bind({});
Success.args = {
  uploadStatus: "success",
  acceptedFileTypes: ["image/*", "application/pdf"],
  maxSize: 5242880,
};

export const Error = Template.bind({});
Error.args = {
  uploadStatus: "error",
  errorMessage: "Failed to upload the file. Please try again.",
  acceptedFileTypes: ["image/*", "application/pdf"],
  maxSize: 5242880,
};
