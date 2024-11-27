import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Comment from "./";

const meta: Meta<typeof Comment> = {
  title: "Comment",
  component: Comment,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Comment>;

export const Default: Story = {
  render: () => <Comment />,
  args: {},
};
