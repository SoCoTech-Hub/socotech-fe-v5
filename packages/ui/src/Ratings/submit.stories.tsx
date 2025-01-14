import type { Meta, StoryObj } from "@storybook/react";

import { RatingSubmission } from "./submit";

const meta: Meta<typeof RatingSubmission> = {
  title: "Ratings/Submit",
  component: RatingSubmission,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof RatingSubmission>;

export const Default: Story = {
  args: {
    onSubmit: (data) => console.log("Rating submitted:", data),
  },
};
