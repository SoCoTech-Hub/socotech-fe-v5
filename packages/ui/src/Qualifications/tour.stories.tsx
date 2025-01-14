import type { Meta, StoryObj } from "@storybook/react";

import { QualificationWelcomeBanner } from "./tour";

const meta: Meta<typeof QualificationWelcomeBanner> = {
  title: "Qualification/Tour",
  component: QualificationWelcomeBanner,
  tags: ["autodocs"],
  argTypes: {
    header: {
      control: { type: "text" },
      description: "Header text displayed in the banner.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof QualificationWelcomeBanner>;

export const Default: Story = {
  render: (args) => <QualificationWelcomeBanner {...args} />,
  args: {
    header: "Explore bursaries currently available in SA",
  },
};

export const CustomHeader: Story = {
  render: (args) => <QualificationWelcomeBanner {...args} />,
  args: {
    header: "Discover exclusive qualification opportunities for your future",
  },
};
