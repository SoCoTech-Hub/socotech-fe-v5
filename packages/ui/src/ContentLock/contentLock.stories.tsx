import type { Meta, StoryObj } from "@storybook/react";

import ContentLock from "./";

const meta: Meta<typeof ContentLock> = {
  title: "ContentLock",
  component: ContentLock,
  tags: ["autodocs"],
  argTypes: {
    bgColor: {
      control: { type: "text" },
      description: "Background color for the locked content area.",
    },
    children: {
      control: { type: "text" },
      description:
        "Content to be displayed if the user is a paying subscriber.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContentLock>;

export const Default: Story = {
  render: (args) => (
    <ContentLock {...args}>
      <div className="p-4 text-center">
        <h3 className="text-xl font-bold">Welcome to Premium Content</h3>
        <p className="mt-2 text-lg">Thank you for subscribing!</p>
      </div>
    </ContentLock>
  ),
  args: {
    bgColor: "bg-gray-100",
  },
};

export const CustomBackground: Story = {
  render: (args) => (
    <ContentLock {...args}>
      <div className="p-4 text-center">
        <h3 className="text-xl font-bold">Enjoy Your Premium Benefits</h3>
        <p className="mt-2 text-lg">You have unlocked exclusive content!</p>
      </div>
    </ContentLock>
  ),
  args: {
    bgColor: "bg-blue-100",
  },
};
