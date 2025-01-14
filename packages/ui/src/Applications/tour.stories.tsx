import type { Meta, StoryObj } from "@storybook/react";

import { ApplicationWelcomeBanner } from "./tour";

const meta: Meta<typeof ApplicationWelcomeBanner> = {
  title: "Applications/tour",
  component: ApplicationWelcomeBanner,
  tags: ["autodocs"],
  argTypes: {
    header: {
      control: { type: "text" },
      description: "Header text displayed in the banner.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ApplicationWelcomeBanner>;

export const Default: Story = {
  render: (args) => <ApplicationWelcomeBanner {...args} />,
  args: {
    header: "Explore qualifications currently available in SA",
  },
};

export const CustomHeader: Story = {
  render: (args) => <ApplicationWelcomeBanner {...args} />,
  args: {
    header: "Discover your path to success with our qualifications",
  },
};
