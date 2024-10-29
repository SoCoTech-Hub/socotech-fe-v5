import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for the avatar container.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://via.placeholder.com/40" alt="User Avatar" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
  args: {
    className: "",
  },
};

export const WithFallbackOnly: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage
        src="" // No valid image source to force the fallback
        alt="User Avatar"
      />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
  args: {
    className: "",
  },
};
