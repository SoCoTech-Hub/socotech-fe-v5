import type { Meta, StoryObj } from "@storybook/react";

import { DigilibHeader } from "./header";

const meta: Meta<typeof DigilibHeader> = {
  title: "Digilib/Header",
  component: DigilibHeader,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    loading: {
      control: "boolean",
      description: "Indicates whether the loader is visible",
    },
    name: {
      control: "text",
      description: "The main title of the header",
    },
    category: {
      control: "text",
      description: "The category of the current page",
    },
    subject: {
      control: "text",
      description: "The subject of the current page",
    },
    backOnClick: {
      action: "back clicked",
      description: "Function to handle the back button click",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DigilibHeader>;

export const Default: Story = {
  args: {
    name: "Digital Library",
    loading: false,
    category: "Science",
    subject: "Physics",
  },
  parameters: {
    docs: {
      description: {
        story: "Displays the DigilibHeader with data populated.",
      },
    },
  },
};

export const Loading: Story = {
  args: {
    name: "Digital Library",
    loading: true,
    category: "Science",
    subject: "Physics",
  },
  parameters: {
    docs: {
      description: {
        story: "Displays the loading state of the DigilibHeader.",
      },
    },
  },
};
