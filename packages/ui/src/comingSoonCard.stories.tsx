import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import ComingSoonCard from "./ComingSoonCard/comingSoonCard";

const meta: Meta<typeof ComingSoonCard> = {
  title: "ComingSoonCard",
  component: ComingSoonCard,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Title text displayed on the card.",
    },
    description: {
      control: { type: "text" },
      description: "Description text displayed on the card.",
    },
    ctaText: {
      control: { type: "text" },
      description: "Text for the call-to-action button.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComingSoonCard>;

export const Default: Story = {
  render: (args) => <ComingSoonCard {...args} />,
  args: {
    title: "Coming Soon",
    description: "We're working on something exciting. Stay tuned!",
    ctaText: "Notify Me",
  },
};

export const CustomContent: Story = {
  render: (args) => <ComingSoonCard {...args} />,
  args: {
    title: "New Feature Coming Soon",
    description:
      "We are launching a new feature that will blow your mind. Stay tuned for updates!",
    ctaText: "Get Notified",
  },
};
