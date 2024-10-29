import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "number",
      description: "Sets the current progress value as a percentage.",
      defaultValue: 50,
    },
    className: {
      control: "text",
      description: "Additional CSS classes for custom styling.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 50,
  },
  render: (args) => <Progress {...args} className="w-[60%]" />,
};

export const LowProgress: Story = {
  args: {
    value: 20,
  },
  render: (args) => <Progress {...args} />,
};

export const HighProgress: Story = {
  args: {
    value: 80,
  },
  render: (args) => <Progress {...args} />,
};

export const CustomStyled: Story = {
  args: {
    value: 60,
    className: "h-4 bg-gray-200",
  },
  render: (args) => <Progress {...args} />,
};
