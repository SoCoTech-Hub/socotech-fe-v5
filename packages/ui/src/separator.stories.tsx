import { Meta, StoryObj } from "@storybook/react";

import { Separator } from "./separator";

const meta: Meta<typeof Separator> = {
  title: "Separator",
  component: Separator,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div>
      <p>Item 1</p>
      <Separator orientation="horizontal" className="bg-black" />
      <p>Item 2</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" className="bg-black" />
      <div>Docs</div>
      <Separator orientation="vertical" className="bg-black" />
      <div>Source</div>
    </div>
  ),
};
export const HorizontalVertical: Story = {
  render: () => (
    <div className="w-40">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4 bg-black" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" className="bg-black" />
        <div>Docs</div>
        <Separator orientation="vertical" className="bg-black" />
        <div>Source</div>
      </div>
    </div>
  ),
};
