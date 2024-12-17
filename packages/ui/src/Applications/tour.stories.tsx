import type { Meta, StoryObj } from "@storybook/react";

import WelcomeBanner from "./tour";

const meta: Meta<typeof WelcomeBanner> = {
  title: "Applications/tour",
  component: WelcomeBanner,
  tags: ["autodocs"],
  argTypes: {
    header: {
      control: { type: "text" },
      description: "Header text displayed in the banner.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof WelcomeBanner>;

export const Default: Story = {
  render: (args) => <WelcomeBanner {...args} />,
  args: {
    header: "Explore qualifications currently available in SA",
  },
};

export const CustomHeader: Story = {
  render: (args) => <WelcomeBanner {...args} />,
  args: {
    header: "Discover your path to success with our qualifications",
  },
};
