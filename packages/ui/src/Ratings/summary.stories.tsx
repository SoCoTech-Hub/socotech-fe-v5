import type { Meta, StoryObj } from "@storybook/react";

import Summary from "./summary";

const meta: Meta<typeof Summary> = {
  title: "Ratings/Summary",
  component: Summary,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Summary>;

export const Default: Story = {
  args: {
    ratings: [
      {
        id: 1,
        userId: "1",
        userName: "Alice",
        userAvatar: "",
        rating: 5,
        comment: "",
        usefulCount: 0,
        timestamp: new Date(),
      },
      {
        id: 2,
        userId: "2",
        userName: "Bob",
        userAvatar: "",
        rating: 4,
        comment: "",
        usefulCount: 0,
        timestamp: new Date(),
      },
    ],
  },
};
