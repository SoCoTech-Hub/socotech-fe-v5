import type { Meta, StoryObj } from "@storybook/react";

import { CommentComponent } from "./";

const meta: Meta<typeof CommentComponent> = {
  title: "Comment",
  component: CommentComponent,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CommentComponent>;

const User = {
  id: 1,
  firstName: "john",
  lastName: "dow",
  avatar: "",
};

export const Default: Story = {
  render: () => <CommentComponent user={User} />,
  args: {},
};
