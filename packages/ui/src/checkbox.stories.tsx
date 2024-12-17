import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "Controls the checked state of the checkbox.",
      defaultValue: false,
    },
    disabled: {
      control: "boolean",
      description: "Disables the checkbox, making it unclickable.",
      defaultValue: false,
    },
    className: {
      control: "text",
      description: "Additional CSS classes for custom styling.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
  },
  render: (args) => <Checkbox {...args} />,
};

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
  },
  render: (args) => <Checkbox {...args} />,
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
  render: (args) => <Checkbox {...args} />,
};
