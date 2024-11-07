import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import BursaryWelcomeBanner from "./tour";

const meta: Meta<typeof BursaryWelcomeBanner> = {
  title: "Bursary/Tour",
  component: BursaryWelcomeBanner,
  tags: ["autodocs"],
  argTypes: {
    header: {
      control: { type: "text" },
      description: "Header text displayed in the banner.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BursaryWelcomeBanner>;

export const Default: Story = {
  render: (args) => <BursaryWelcomeBanner {...args} />,
  args: {
    header: "Explore bursaries currently available in SA",
  },
};

export const CustomHeader: Story = {
  render: (args) => <BursaryWelcomeBanner {...args} />,
  args: {
    header: "Discover exclusive bursary opportunities for your future",
  },
};
