import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import SearchFilter from "./search";

const meta: Meta<typeof SearchFilter> = {
  title: "Applications/SearchFilter",
  component: SearchFilter,
  tags: ["autodocs"],
  argTypes: {
    setQualifications: {
      action: "setQualifications",
      description:
        "Function to update the list of qualifications based on the search and filter criteria.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchFilter>;

export const Default: Story = {
  render: (args) => <SearchFilter {...args} />,
  args: {
    setQualifications: (qualifications) =>
      console.log("Qualifications updated:", qualifications),
  },
};
