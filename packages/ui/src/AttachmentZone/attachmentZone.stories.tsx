import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { DropzoneProps } from "./attachmentZone";
import Dropzone from "./attachmentZone";

export default {
  title: "Attachments/AttachmentZone",
  component: Dropzone,
  args: {
    maxSize: { control: "number", defaultValue: 5242880 },
    acceptedFileTypes: {
      control: "array",
      defaultValue: ["image/*", "application/pdf"],
    },
    uploadUrl: { control: "text", defaultValue: "/api/upload" },
  },
} as Meta;

const Template: StoryFn<DropzoneProps> = (args) => <Dropzone {...args} />;

export const Default = Template.bind({});
Default.args = {
  maxSize: 5242880,
  acceptedFileTypes: ["image/*", "application/pdf"],
  uploadUrl: "/api/upload",
};

export const CustomConfig = Template.bind({});
CustomConfig.args = {
  maxSize: 10485760, // 10MB
  acceptedFileTypes: ["image/png", "application/json"],
  uploadUrl: "/custom-upload",
};
