import type { Meta, StoryObj } from "@storybook/react";

import Comment from "./";

const meta: Meta<typeof Comment> = {
  title: "Comment",
  component: Comment,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Comment>;

const User = {
  id: 1,
  firstName: "john",
  lastName: "dow",
  avatar: "",
};

export const Default: Story = {
  render: () => <Comment user={User} />,
  args: {},
};
