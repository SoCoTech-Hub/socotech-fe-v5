import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import ForumPostView from "./";

const meta: Meta<typeof ForumPostView> = {
  title: "Forum/PostView",
  component: ForumPostView,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ForumPostView>;

export const Default: Story = {
  render: function DefaultRender() {
    return <ForumPostView />;
  },
};
