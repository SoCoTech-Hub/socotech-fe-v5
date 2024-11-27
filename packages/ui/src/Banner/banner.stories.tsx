import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Banner from "./index";

const meta: Meta<typeof Banner> = {
  title: "Banner",
  component: Banner,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Title text displayed in the banner.",
    },
    paragraphs: {
      control: { type: "object" },
      description: "List of paragraphs displayed in the banner.",
    },
    gifSrc: {
      control: { type: "text" },
      description: "Source URL of the GIF image.",
    },
    gifAlt: {
      control: { type: "text" },
      description: "Alt text for the GIF image.",
    },
    ctaText: {
      control: { type: "text" },
      description: "Text for the call-to-action button.",
    },
    onCtaClick: {
      action: "ctaClicked",
      description: "Handler called when the call-to-action button is clicked.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  render: (args) => <Banner {...args} />,
  args: {
    title: "Welcome to Our Platform",
    paragraphs: [
      "Discover a wide range of qualifications available to help you start your career.",
      "We provide resources and support to help you choose the best path for your future.",
    ],
    gifSrc: "https://via.placeholder.com/400x300",
    gifAlt: "Welcome GIF",
    ctaText: "Get Started",
    onCtaClick: () => console.log("CTA button clicked"),
  },
};

export const CustomContent: Story = {
  render: (args) => <Banner {...args} />,
  args: {
    title: "Your Future Starts Here",
    paragraphs: [
      "Take the first step towards a rewarding career with our expertly curated qualifications.",
      "Explore your interests and unlock your potential with our help.",
    ],
    gifSrc: "https://via.placeholder.com/400x300",
    gifAlt: "Future GIF",
    ctaText: "Learn More",
    onCtaClick: () => console.log("CTA button clicked"),
  },
};
