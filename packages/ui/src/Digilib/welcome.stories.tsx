import type { Meta, StoryObj } from "@storybook/react";

import { Welcome } from "./welcome";

const meta: Meta<typeof Welcome> = {
  title: "Digilib/Welcome",
  component: Welcome,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    imageUrl: {
      control: "text",
      description: "URL of the welcome image",
      defaultValue: "/digilib_welcome.png",
    },
    title: {
      control: "text",
      description: "Main title text displayed on the welcome banner",
      defaultValue: "Hello, how can we help you?",
    },
    subtitle: {
      control: "text",
      description: "Subtitle text that provides additional context",
      defaultValue:
        "Tell us what you are looking for in the search bar below, select a category, and we will help you find what you need.",
    },
    loading: {
      control: "boolean",
      description: "Shows skeleton loading state when true",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Welcome>;

export const Default: Story = {
  args: {
    imageUrl: "/digilib_welcome.png",
    title: "Hello, how can we help you?",
    subtitle:
      "Tell us what you are looking for in the search bar below, select a category, and we will help you find what you need.",
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};
