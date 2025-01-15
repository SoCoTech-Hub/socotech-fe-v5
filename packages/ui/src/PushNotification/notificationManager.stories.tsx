import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import type { PushNotificationProps } from "./notification";
import { PushNotification } from "./notification";

export default {
  title: "PushNotification/Notification",
  component: PushNotification,
} as Meta;

const Template: StoryFn<PushNotificationProps> = (args) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <PushNotification
      {...args}
      onDismiss={() => {
        console.log("Notification dismissed");
        setIsVisible(false);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  message: "This is a default notification!",
  variant: "default",
  duration: 5000,
};

export const Success = Template.bind({});
Success.args = {
  message: "Action was successful!",
  variant: "success",
  duration: 5000,
};

export const Error = Template.bind({});
Error.args = {
  message: "Something went wrong!",
  variant: "error",
  duration: 5000,
};

export const Info = Template.bind({});
Info.args = {
  message: "Here is some information.",
  variant: "info",
  duration: 5000,
};
