import type { Meta, StoryFn } from "@storybook/react";

import HLSVideoPlayer from "./videoPlayer";

export default {
  title: "VideoPlayer",
  component: HLSVideoPlayer,
} as Meta;

const Template: StoryFn = (args) => (
  <HLSVideoPlayer title="" url="" {...args} />
);

export const Default = Template.bind({});
Default.args = {
  url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
  title: "Sample HLS Video",
};
