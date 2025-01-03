import type { Meta, StoryObj } from "@storybook/react";

import DraggableContent from "./draggable";

const meta: Meta<typeof DraggableContent> = {
  title: "DraggableContent",
  component: DraggableContent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A draggable card component that supports customizable title, content, and an optional close button. Suitable for interactive layouts.",
      },
    },
  },
  argTypes: {
    title: {
      control: { type: "text" },
      description: "The title displayed in the header of the draggable card.",
      defaultValue: "Draggable Card",
    },
    content: {
      control: { type: "text" },
      description: "The content displayed inside the card body.",
      defaultValue: "This is some draggable content.",
    },
    onClose: {
      action: "close",
      description: "Callback function to handle card close action.",
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
  parameters: {
    docs: {
      description: {
        story:
          "The default draggable card with a title, content, and a functional close button.",
      },
    },
  },
};

export const WithoutCloseButton: Story = {
  args: {
    title: "Fixed Card",
    content: "This card cannot be closed.",
    onClose: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          "A draggable card variant without a close button, suitable for non-dismissable elements.",
      },
    },
  },
};
