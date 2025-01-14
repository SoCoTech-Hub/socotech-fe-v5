import type { Meta, StoryFn } from "@storybook/react";

import { ZoomIntegration } from "./zoomIntegration";

export default {
  title: "Zoom/ZoomIntegration",
  component: ZoomIntegration,
} as Meta;

const Template: StoryFn = () => <ZoomIntegration />;

export const DefaultZoomIntegration = Template.bind({});
