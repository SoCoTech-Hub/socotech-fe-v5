import type { Meta, StoryObj } from "@storybook/react";

import InfoSection from "./info";

const meta: Meta<typeof InfoSection> = {
  title: "Profile/Info",
  component: InfoSection,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof InfoSection>;

export const Default: Story = {
  render: () => <InfoSection />,
};

export const LoadingState: Story = {
  render: () => <InfoSection />,
  parameters: {
    // Simulate loading state by setting a delay to showcase the skeleton loader
    chromatic: { delay: 100 },
  },
};
