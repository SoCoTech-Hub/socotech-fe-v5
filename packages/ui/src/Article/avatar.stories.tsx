import type { Meta, StoryFn } from "@storybook/react";

import Avatar, { AvatarProps } from "./avatar";

export default {
  title: "Article/Avatar",
  component: Avatar,
} as Meta;

const Template: StoryFn<AvatarProps> = (args) => <Avatar {...args} />;

export const DefaultAvatar = Template.bind({});
DefaultAvatar.args = {
  firstName: "John",
  lastName: "Doe",
  title: "Software Engineer",
  avatarUrl: "https://via.placeholder.com/150",
};
