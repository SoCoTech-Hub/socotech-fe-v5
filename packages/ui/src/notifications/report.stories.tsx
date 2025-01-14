import type { Meta, StoryObj } from "@storybook/react";

import { NotificationStatusReport } from "./report";

const meta: Meta<typeof NotificationStatusReport> = {
  title: "Notifications/Report",
  component: NotificationStatusReport,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    total: {
      control: "number",
      description: "Total number of notifications",
      defaultValue: 10,
    },
    read: {
      control: "number",
      description: "Number of read notifications",
      defaultValue: 7,
    },
    unread: {
      control: "number",
      description: "Number of unread notifications",
      defaultValue: 3,
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationStatusReport>;

export const Default: Story = {
  args: {
    total: 10,
    read: 7,
    unread: 3,
  },
};

export const AllRead: Story = {
  args: {
    total: 10,
    read: 10,
    unread: 0,
  },
};

export const AllUnread: Story = {
  args: {
    total: 10,
    read: 0,
    unread: 10,
  },
};
