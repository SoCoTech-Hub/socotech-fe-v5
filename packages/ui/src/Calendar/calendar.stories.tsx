import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import EnhancedTaskCalendar from ".";

const meta: Meta<typeof EnhancedTaskCalendar> = {
  title: "Components/EnhancedTaskCalendar",
  component: EnhancedTaskCalendar,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof EnhancedTaskCalendar>;

export const Default: Story = {
  render: (args) => <EnhancedTaskCalendar {...args} />,
  args: {},
};
