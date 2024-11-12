import type { Meta, StoryObj } from "@storybook/react";

import Submit from "./submit";

const meta: Meta<typeof Submit> = {
  title: "Ratings/Submit",
  component: Submit,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Submit>;

export const Default: Story = {
  args: {
    onSubmit: (data) => console.log("Rating submitted:", data),
  },
};
