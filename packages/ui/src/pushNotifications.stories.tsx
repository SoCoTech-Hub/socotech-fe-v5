import type { Meta, StoryFn } from "@storybook/react";

import PushNotifications, { PushNotificationsProps } from "./pushNotifications";

export default {
  title: "Components/PushNotifications",
  component: PushNotifications,
} as Meta;

const Template: StoryFn<PushNotificationsProps> = (args) => (
  <PushNotifications {...args} />
);

export const DefaultPushNotifications = Template.bind({});
DefaultPushNotifications.args = {
  apiEndpoint: "https://api.example.com",
  vapidPublicKey: "BMexampleVapidPublicKey",
  userId: "user123",
  title: "Push Notifications",
  description: "Manage your push notification preferences.",
};
