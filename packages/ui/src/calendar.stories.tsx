import { Meta, StoryObj } from "@storybook/react";

import { Calendar } from "./calendar";

const meta: Meta<typeof Calendar> = {
  title: "Calendar",
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "multiple", "range"],
      description: "Specifies the selection mode of the calendar.",
    },
    showOutsideDays: {
      control: "boolean",
      description: "Shows the days outside of the current month.",
    },
    className: {
      control: "text",
      description: "Additional CSS classes for custom styling.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    mode: "single",
    showOutsideDays: true,
  },
};

export const RangeSelection: Story = {
  args: {
    mode: "range",
    showOutsideDays: true,
  },
};

export const MultipleSelection: Story = {
  args: {
    mode: "multiple",
    showOutsideDays: false,
  },
};
