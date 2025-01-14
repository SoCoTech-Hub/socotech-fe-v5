import type { Meta, StoryObj } from "@storybook/react";

import { NotificationManager } from "./notificationManager";

const meta: Meta<typeof NotificationManager> = {
  title: "PushNotification/NotificationManager",
  component: NotificationManager,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof NotificationManager>;

export const Default: Story = {
  args: {
    title: "Push Notifications",
    description: "Manage your push notification preferences.",
  },
};
