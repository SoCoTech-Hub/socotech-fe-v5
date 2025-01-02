import type { Meta, StoryObj } from "@storybook/react";

import PushNotifications from "./pushNotifications";

const meta: Meta<typeof PushNotifications> = {
  title: "Components/PushNotifications",
  component: PushNotifications,
  parameters: {
    layout: "centered",
  },
  args: {
    apiEndpoint: "https://example.com/api", // TODO: Replace with your API endpoint
    vapidPublicKey: "YOUR_VAPID_PUBLIC_KEY", // TODO: Replace with your VAPID key
    userId: "user-123", // Replace with a sample user ID
    title: "Push Notifications",
    description: "Manage your notification preferences",
  },
};

export default meta;

type Story = StoryObj<typeof PushNotifications>;

export const Default: Story = {};

export const NotificationsEnabled: Story = {
  args: {
    // Simulate enabled notifications
    isEnabled: true,
    notifications: [
      {
        id: 1,
        title: "New Message",
        body: "You have a new message from John.",
        timestamp: new Date(),
      },
    ],
  },
};

export const NotificationsDisabled: Story = {
  args: {
    // Simulate disabled notifications
    isEnabled: false,
  },
};

export const WithRecentNotifications: Story = {
  args: {
    // Simulate multiple recent notifications
    isEnabled: true,
    notifications: [
      {
        id: 1,
        title: "System Update",
        body: "Your system will restart for updates in 10 minutes.",
        timestamp: new Date(),
      },
      {
        id: 2,
        title: "New Event",
        body: "Don't miss your upcoming meeting at 3 PM.",
        timestamp: new Date(),
      },
    ],
  },
};

export const SimulatingNewNotification: Story = {
  args: {
    // Simulate a state where a new notification is being generated
    isEnabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Simulate clicking the "Simulate New Notification" button
    const simulateButton = canvas.getByText("Simulate New Notification");
    fireEvent.click(simulateButton);
  },
};

function within(canvasElement: HTMLElement) {
  return testingLibraryWithin(canvasElement);
}
