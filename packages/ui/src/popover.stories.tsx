import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const meta: Meta<typeof Popover> = {
  title: "Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "select",
      options: ["center", "start", "end"],
      description: "Specifies the alignment of the popover content.",
      defaultValue: "center",
    },
    sideOffset: {
      control: "number",
      description:
        "Sets the offset distance of the popover content from the trigger.",
      defaultValue: 4,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    align: "center",
    sideOffset: 4,
  },
  render: (args) => (
    <Popover>
      <PopoverTrigger className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white">
        Open Popover
      </PopoverTrigger>
      <PopoverContent {...args} className="p-4">
        This is the popover content. You can place any elements here.
      </PopoverContent>
    </Popover>
  ),
};

export const CustomAlignment: Story = {
  args: {
    align: "start",
    sideOffset: 10,
  },
  render: (args) => (
    <Popover>
      <PopoverTrigger className="cursor-pointer rounded bg-green-500 px-4 py-2 text-white">
        Custom Alignment
      </PopoverTrigger>
      <PopoverContent {...args} className="p-4">
        This popover is aligned to the start with a custom offset.
      </PopoverContent>
    </Popover>
  ),
};
