import type { Meta, StoryObj } from "@storybook/react";

import { Cover } from "./cover";

const meta: Meta<typeof Cover> = {
  title: "Profile/Cover",
  component: Cover,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    name: { control: "text", description: "The user's name" },
    bannerImage: { control: "text", description: "The user's banner's url" },
    avatarImage: { control: "text", description: "The user's avatar url" },
    user: {
      control: "object",
      description: "The user's details, only need user id and profile id",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Cover>;

export const Default: Story = {
  render: () => <Cover name="John" user={{ id: "1", profile: { id: "1" } }} />,
};

export const WithCustomImages: Story = {
  render: () => (
    <Cover
      name="John"
      bannerImage="https://via.placeholder.com/200x100"
      avatarImage="https://via.placeholder.com/100"
      user={{ id: "1", profile: { id: "1" } }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "This story showcases the `ProfileBanner` with preloaded custom images.",
      },
    },
  },
};

export const LoadingState: Story = {
  render: () => <Cover user={{ id: "1", profile: { id: "1" } }} />,
  parameters: {
    docs: {
      description: {
        story:
          "Simulates a loading state or fallback while images are being uploaded.",
      },
    },
  },
};
