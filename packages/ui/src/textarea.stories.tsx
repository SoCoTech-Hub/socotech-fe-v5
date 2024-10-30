import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Textarea, TextareaProps } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text for the textarea",
      defaultValue: "Enter your text...",
    },
    disabled: {
      control: "boolean",
      description: "Disables the textarea",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "Enter your text here...",
  },
  render: (args) => <Textarea {...args} />,
};

export const Disabled: Story = {
  args: {
    placeholder: "This textarea is disabled",
    disabled: true,
  },
  render: (args) => <Textarea {...args} />,
};

export const WithCustomStyles: Story = {
  args: {
    placeholder: "Styled textarea",
  },
  render: (args) => (
    <Textarea
      {...args}
      className="border-blue-500 bg-gray-50 focus-visible:ring-2 focus-visible:ring-blue-500"
    />
  ),
};
