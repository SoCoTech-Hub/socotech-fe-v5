import type { Meta, StoryObj } from "@storybook/react";

import { Modal } from "./modal";

const meta: Meta<typeof Modal> = {
  title: "Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const sample = {
  title: "System Alert",
  message:
    "Your system requires an update. Please update to the latest version to ensure security.",
  timestamp: new Date().toISOString(),
};

export const Default: Story = {
  args: {
    title: sample.title,
    message: sample.message,
    timestamp: sample.timestamp,
    onClose: () => alert("Modal closed"),
  },
};
