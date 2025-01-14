import type { Meta, StoryFn } from "@storybook/react";

import { UploadThumbnail, UploadThumbnailProps } from "./";

export default {
  title: "Components/UploadThumbnail",
  component: UploadThumbnail,
} as Meta;

const Template: StoryFn<UploadThumbnailProps> = (args) => (
  <UploadThumbnail {...args} />
);

export const DefaultUploadThumbnail = Template.bind({});
DefaultUploadThumbnail.args = {
  files: [
    {
      id: "1",
      url: "https://via.placeholder.com/150",
      mime: "image/jpeg",
      name: "Example Image 1",
    },
    {
      id: "2",
      url: "https://via.placeholder.com/150",
      mime: "image/jpeg",
      name: "Example Image 2",
    },
  ],
  handleFileRemove: (id) => {
    console.log("File removed: ", id);
  },
};
