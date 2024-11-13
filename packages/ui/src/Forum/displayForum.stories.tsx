import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import ForumDisplay from "./displayForum";

const meta: Meta<typeof ForumDisplay> = {
  title: "Forum/Display",
  component: ForumDisplay,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ForumDisplay>;

export const Default: Story = {
  render: function DefaultRender() {
    return <ForumDisplay />;
  },
};