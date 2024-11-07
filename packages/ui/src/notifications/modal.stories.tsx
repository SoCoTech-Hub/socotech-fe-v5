import type { Meta, StoryObj } from "@storybook/react";

import type { Notification } from "./list";
import NotificationModal from "./modal";

const meta: Meta<typeof NotificationModal> = {
  title: "Notifications/Modal",
  component: NotificationModal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof NotificationModal>;

const sampleNotification: Notification = {
  id: "1",
  title: "System Alert",
  message:
    "Your system requires an update. Please update to the latest version to ensure security.",
  timestamp: new Date(),
  isRead: false,
};

export const Default: Story = {
  args: {
    notification: sampleNotification,
    onClose: () => alert("Modal closed"),
  },
};
