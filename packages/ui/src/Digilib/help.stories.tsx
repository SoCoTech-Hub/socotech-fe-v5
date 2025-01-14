import type { Meta, StoryObj } from "@storybook/react";

import { DigilibHelp } from "./help";

const meta: Meta<typeof DigilibHelp> = {
  title: "Digilib/Help",
  component: DigilibHelp,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    loading: {
      control: "boolean",
      description: "Displays a skeleton loader when true",
      defaultValue: false,
    },
    categories: {
      control: "object",
      description: "List of category items with id and name",
      defaultValue: [
        { id: "1", name: "Science" },
        { id: "2", name: "Arts" },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DigilibHelp>;

export const Default: Story = {
  args: {
    categories: [
      { id: "1", name: "Science" },
      { id: "2", name: "Arts" },
    ],
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    categories: [],
    loading: true,
  },
};
