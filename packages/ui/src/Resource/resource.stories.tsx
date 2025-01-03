import type { Meta, StoryObj } from "@storybook/react";

import ResourcePage from "./";

export default {
  title: "Resource/ResourcePage",
  component: ResourcePage,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    resourceId: { control: "text" },
  },
} as Meta<typeof ResourcePage>;

type Story = StoryObj<typeof ResourcePage>;

export const VideoResource: Story = {
  args: {
    resourceId: "video-sample",
  },
};

export const AudioResource: Story = {
  args: {
    resourceId: "audio-sample",
  },
};

export const PDFResource: Story = {
  args: {
    resourceId: "pdf-sample",
  },
};

export const LoadingState: Story = {
  args: {
    resourceId: "loading-state",
  },
};

export const InvalidResourceType: Story = {
  args: {
    resourceId: "invalid-type",
  },
};
