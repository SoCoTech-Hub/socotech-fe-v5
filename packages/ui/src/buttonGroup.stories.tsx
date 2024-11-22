import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Minus, Plus, Star } from "lucide-react";

import ButtonGroup from "./buttonGroup";

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  argTypes: {
    buttons: {
      control: { type: "object" },
      description: "Array of button items to display in the group.",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "outline", "secondary"],
      description: "Variant style of the buttons.",
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg"],
      description: "Size of the buttons.",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes for the button group.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: (args) => <ButtonGroup {...args} />,
  args: {
    buttons: [
      { label: "Add", icon: Plus, onClick: () => console.log("Add clicked") },
      {
        label: "Remove",
        icon: Minus,
        onClick: () => console.log("Remove clicked"),
      },
      {
        label: "Favorite",
        icon: Star,
        onClick: () => console.log("Favorite clicked"),
      },
    ],
    variant: "default",
    size: "default",
  },
};

export const OutlineVariant: Story = {
  render: (args) => <ButtonGroup {...args} />,
  args: {
    buttons: [
      { label: "Add", icon: Plus, onClick: () => console.log("Add clicked") },
      {
        label: "Remove",
        icon: Minus,
        onClick: () => console.log("Remove clicked"),
      },
      {
        label: "Favorite",
        icon: Star,
        onClick: () => console.log("Favorite clicked"),
      },
    ],
    variant: "outline",
    size: "default",
  },
};

export const LargeSize: Story = {
  render: (args) => <ButtonGroup {...args} />,
  args: {
    buttons: [
      { label: "Add", icon: Plus, onClick: () => console.log("Add clicked") },
      {
        label: "Remove",
        icon: Minus,
        onClick: () => console.log("Remove clicked"),
      },
      {
        label: "Favorite",
        icon: Star,
        onClick: () => console.log("Favorite clicked"),
      },
    ],
    variant: "default",
    size: "lg",
  },
};
