import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import ResourcePage from "./";

export default {
  title: "Components/ResourcePage",
  component: ResourcePage,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    resourceId: { control: "text" },
  },
} as Meta<typeof ResourcePage>;

const Template: StoryObj<typeof ResourcePage> = (args) => (
  <ResourcePage {...args} />
);

export const VideoResource = Template.bind({});
VideoResource.args = {
  resourceId: "video-sample",
};

export const AudioResource = Template.bind({});
AudioResource.args = {
  resourceId: "audio-sample",
};

export const PDFResource = Template.bind({});
PDFResource.args = {
  resourceId: "pdf-sample",
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  resourceId: "loading-state",
};
