import { Meta, StoryObj } from "@storybook/react";

import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number"],
      description: "Specifies the type of input field.",
      defaultValue: "text",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input.",
      defaultValue: "Enter text...",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input field.",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Enter text...",
    disabled: false,
  },
  render: (args) => <Input {...args} />,
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter your password",
    disabled: false,
  },
  render: (args) => <Input {...args} />,
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email",
    disabled: false,
  },
  render: (args) => <Input {...args} />,
};

export const Disabled: Story = {
  args: {
    type: "text",
    placeholder: "Disabled input",
    disabled: true,
  },
  render: (args) => <Input {...args} />,
};
