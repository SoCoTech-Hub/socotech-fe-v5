import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Label } from "./label";

const meta: Meta<typeof Label> = {
  title: "Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for custom styling.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Default Label",
  },
  render: (args) => <Label {...args} />,
};

export const WithInput: Story = {
  args: {
    children: "Username",
  },
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label {...args} htmlFor="username-input" />
      <input
        type="text"
        id="username-input"
        className="rounded-md border p-2 text-sm"
        placeholder="Enter your username"
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: "Disabled Label",
    className: "peer-disabled:opacity-70 peer-disabled:cursor-not-allowed",
  },
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label {...args} htmlFor="disabled-input" />
      <input
        type="text"
        id="disabled-input"
        disabled
        className="rounded-md border p-2 text-sm"
        placeholder="Disabled input"
      />
    </div>
  ),
};
