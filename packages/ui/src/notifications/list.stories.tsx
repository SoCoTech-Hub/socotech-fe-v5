import type { Meta, StoryObj } from "@storybook/react";

import NotificationList from "./list";

const meta: Meta<typeof NotificationList> = {
  title: "Notifications/List",
  component: NotificationList,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof NotificationList>;

const sampleNotifications = [
  {
    id: "1",
    title: "New Message",
    message: "You have received a new message.",
    timestamp: new Date(),
    isRead: false,
  },
  {
    id: "2",
    title: "System Update",
    message: "The system will undergo maintenance tonight.",
    timestamp: new Date(Date.now() - 86400000),
    isRead: true,
  },
  {
    id: "3",
    title: "Task Due",
    message: "Your task is due tomorrow.",
    timestamp: new Date(Date.now() - 43200000),
    isRead: false,
  },
];

export const Default: Story = {
  args: {
    initialNotifications: sampleNotifications,
  },
};
