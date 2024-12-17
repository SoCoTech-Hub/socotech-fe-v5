import type { Meta, StoryFn } from "@storybook/react";

import FileUploader from "./fileUploader";

export default {
  title: "FileUploader",
  component: FileUploader,
  parameters: {
    layout: "centered",
  },
} as Meta;

const Template: StoryFn = (args) => <FileUploader {...args} />;

export const Default = Template.bind({});
Default.args = {};
