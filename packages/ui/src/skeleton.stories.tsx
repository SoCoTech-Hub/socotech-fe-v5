import { Meta, StoryObj } from "@storybook/react";

import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Apply additional CSS classes to style the skeleton.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton className="h-4 w-32" />,
};

export const Circle: Story = {
  render: () => <Skeleton className="h-10 w-10 rounded-full" />,
};

export const LargeRectangle: Story = {
  render: () => <Skeleton className="h-20 w-64" />,
};

export const TextLine: Story = {
  render: () => (
    <div>
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
};
export const AvatarWithText: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};
export const Card: Story = {
  render: () => (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ),
};
