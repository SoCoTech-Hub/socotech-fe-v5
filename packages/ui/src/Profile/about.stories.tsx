import type { Meta, StoryObj } from "@storybook/react";

import about from "./about";

const meta: Meta<typeof about> = {
  title: "Profile/About",
  component: about,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    firstName: {
      control: "text",
      description: "The user's first name",
      defaultValue: "John",
    },
    surname: {
      control: "text",
      description: "The user's surname",
      defaultValue: "Doe",
    },
    email: {
      control: "text",
      description: "The user's email",
      defaultValue: "john.doe@example.com",
    },
    bio: {
      control: "text",
      description: "A short biography of the user",
      defaultValue: "A passionate developer with a love for coding.",
    },
    location: {
      control: "text",
      description: "The user's location",
      defaultValue: "San Francisco, CA",
    },
  },
};

export default meta;
type Story = StoryObj<typeof about>;

export const Default: Story = {
  args: {
    firstName: "John",
    surname: "Doe",
    email: "john.doe@example.com",
    bio: "A passionate developer with a love for coding.",
    location: "San Francisco, CA",
  },
};

export const LoadingState: Story = {
  args: {
    firstName: "Loading",
    surname: "Loading",
    email: "loading@example.com",
    bio: "Loading bio...",
    location: "Loading location...",
  },
  decorators: [(Story) => <div>{Story()}</div>],
};
