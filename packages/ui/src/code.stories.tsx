import { Meta, StoryObj } from "@storybook/react";

import { Code } from "./code";

const meta: Meta<typeof Code> = {
  title: "Code",
  component: Code,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes for custom styling.",
    },
    children: {
      control: "text",
      description:
        "Text or code content to be displayed within the code element.",
      defaultValue: "Sample code text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Code>;

export const Default: Story = {
  args: {
    children: "const x = 10;",
    className: "",
  },
  render: (args) => <Code {...args} />,
};

export const StyledCode: Story = {
  args: {
    children: "const y = 20;",
    className: "bg-gray-200 p-1 rounded text-blue-600 font-mono",
  },
  render: (args) => <Code {...args} />,
};
