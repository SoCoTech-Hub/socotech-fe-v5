import type { Meta, StoryObj } from "@storybook/react";

import ReportWelcomeBanner from "./tour";

const meta: Meta<typeof ReportWelcomeBanner> = {
  title: "Report/Tour",
  component: ReportWelcomeBanner,
  tags: ["autodocs"],
  argTypes: {
    header: {
      control: { type: "text" },
      description: "Header text displayed in the banner.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReportWelcomeBanner>;

export const Normal: Story = {
  render: (args) => <ReportWelcomeBanner {...args} />,
  args: {
    header: "Explore bursaries currently available in SA",
  },
};

export const CustomHeader: Story = {
  render: (args) => <ReportWelcomeBanner {...args} />,
  args: {
    header: "Discover exclusive report opportunities for your future",
  },
};
