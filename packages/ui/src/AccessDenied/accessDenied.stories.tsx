import type { Meta, StoryFn } from "@storybook/react";

import { AccessDenied } from "./accessDenied";

export default {
  title: "AccessDenied",
  component: AccessDenied,
  argTypes: {
    isOpen: { control: "boolean" },
    onClose: { action: "onClose" },
    onRequestAccess: { action: "onRequestAccess" },
    title: { control: "text" },
    description: { control: "text" },
  },
} as Meta;

const Template: StoryFn = (args) => <AccessDenied {...args} />;

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  title: "Access Denied",
  description: "You don't have permission to access this section.",
};

export const CustomContent = Template.bind({});
CustomContent.args = {
  isOpen: true,
  title: "Restricted Area",
  description: "This area is restricted. Please contact the administrator.",
};

export const RequestingAccess = Template.bind({});
RequestingAccess.args = {
  isOpen: true,
  title: "Access Denied",
  description: "You don't have permission to access this section.",
  onRequestAccess: async () =>
    new Promise((resolve) => setTimeout(resolve, 2000)),
};
