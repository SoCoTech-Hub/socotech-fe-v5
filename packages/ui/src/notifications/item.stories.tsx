import type { Meta, StoryObj } from "@storybook/react";

import type { Notification } from "./list";
import { NotificationItem } from "./item";

const meta: Meta<typeof NotificationItem> = {
  title: "Notifications/Item",
  component: NotificationItem,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof NotificationItem>;

const sampleNotification: Notification = {
  id: "1",
  title: "New Message",
  message: "You have received a new message from your team leader.",
  timestamp: new Date(),
  isRead: false,
};

export const Unread: Story = {
  args: {
    notification: sampleNotification,
    onClick: () => alert("Notification clicked"),
  },
};

export const Read: Story = {
  args: {
    notification: { ...sampleNotification, isRead: true },
    onClick: () => alert("Notification clicked"),
  },
};
