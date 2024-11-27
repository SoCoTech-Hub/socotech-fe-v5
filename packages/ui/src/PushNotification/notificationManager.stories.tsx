import type { Meta, StoryObj } from "@storybook/react";

import NotificationManager from "./notificationManager";

export default {
  title: "PushNotification/NotificationManager",
  component: NotificationManager,
  parameters: {
    layout: "centered",
  },
} as Meta;

const Template: StoryObj = (args) => <NotificationManager {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Push Notifications",
  description: "Manage your push notification preferences.",
};
