import type { Meta, StoryObj } from "@storybook/react";

import Cover from "./cover";

const meta: Meta<typeof Cover> = {
  title: "Profile/Cover",
  component: Cover,
  parameters: {
    layout: "centered",
	},
	args: {
		name,
		bannerImage,
		avatarImage
	}
};

export default meta;
type Story = StoryObj<typeof Cover>;

export const Default: Story = {
  render: () => <Cover />,
};

export const WithCustomImages: Story = {
  render: () => (
    <Cover
    // Mock initial state for images
    // initialBannerImage="/example-banner.jpg"
    // initialAvatarImage="/example-avatar.jpg"
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
  render: () => <Cover />,
  parameters: {
    docs: {
      description: {
        story:
          "Simulates a loading state or fallback while images are being uploaded.",
      },
    },
  },
};
