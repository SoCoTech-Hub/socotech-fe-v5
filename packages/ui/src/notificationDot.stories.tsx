import type { Meta, StoryObj } from "@storybook/react";

import NotificationDot from "./notificationDot";

const meta: Meta<typeof NotificationDot> = {
  title: "Components/NotificationDot",
  component: NotificationDot,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    active: {
      control: "boolean",
      description: "Controls the visibility of the notification dot",
      defaultValue: true,
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Sets the size of the dot",
      defaultValue: "md",
    },
    color: {
      control: "radio",
      options: ["primary", "secondary", "destructive"],
      description: "Sets the color of the dot",
      defaultValue: "primary",
    },
    position: {
      control: "select",
      options: ["top-right", "top-left", "bottom-right", "bottom-left"],
      description: "Sets the position of the dot relative to its container",
      defaultValue: "top-right",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for custom styling",
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationDot>;

export const Default: Story = {
  args: {
    active: true,
    size: "md",
    color: "primary",
    position: "top-right",
  },
  render: (args) => (
    <div className="relative inline-block rounded-full bg-gray-100 p-4">
      <NotificationDot {...args} />
      <span className="pl-8">Item with Notification</span>
    </div>
  ),
};
