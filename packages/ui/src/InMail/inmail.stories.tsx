import type { Meta, StoryObj } from "@storybook/react";

import { EmailApp } from "./";

const meta: Meta<typeof EmailApp> = {
  title: "Inmail/EmailApp",
  component: EmailApp,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmailApp>;

export const Default: Story = {
  render: function DefaultRender() {
    return <EmailApp />;
  },
};
