import type { Meta, StoryObj } from "@storybook/react";
import * as React from "React";

import { Button } from "./button";

const meta = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "I am a primary button.",
    variant: "default",
    size: "default",
  },
};
export const Secondary: Story = {
  args: {
    children: "I am a secondary button.",
    variant: "secondary",
    size: "default",
  },
};
export const Ghost: Story = {
  args: {
    children: "I am a ghost button.",
    variant: "ghost",
    size: "default",
  },
};
export const Outline: Story = {
  args: {
    children: "I am a outline button.",
    variant: "outline",
    size: "default",
  },
};

export const Destructive: Story = {
  args: {
    children: "I am a destructive button.",
    variant: "destructive",
    size: "default",
  },
};

export const Link: Story = {
  args: {
    children: "I am a link button.",
    variant: "link",
    size: "default",
  },
};

export const Icon: Story = {
  args: {
    children: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-6"
      >
        <path
          fill-rule="evenodd"
          d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z"
          clip-rule="evenodd"
        />
      </svg>
    ),
    variant: "outline",
    size: "icon",
  },
};
