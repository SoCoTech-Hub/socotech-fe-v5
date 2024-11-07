import type { Meta, StoryObj } from "@storybook/react";

import DraggableContent from "./draggable";

const meta: Meta<typeof DraggableContent> = {
  title: "Draggable",
  component: DraggableContent,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: {
      control: "text",
      description: "The title displayed in the header of the draggable card",
      defaultValue: "Draggable Card",
    },
    content: {
      control: "text",
      description: "The content displayed inside the card body",
      defaultValue: "This is some draggable content.",
    },
    onClose: {
      action: "close",
      description: "Callback function to handle card close action",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DraggableContent>;

export const Default: Story = {
  args: {
    title: "Draggable Card",
    content: "This is some draggable content.",
  },
};

export const WithoutCloseButton: Story = {
  args: {
    title: "Fixed Card",
    content: "This card cannot be closed.",
    onClose: undefined,
  },
};
