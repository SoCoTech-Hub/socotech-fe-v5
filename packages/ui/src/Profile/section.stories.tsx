import type { Meta, StoryObj } from "@storybook/react";

import Section from "./section";

const meta: Meta<typeof Section> = {
  title: "Profile/Section",
  component: Section,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  render: () => <Section />,
};
