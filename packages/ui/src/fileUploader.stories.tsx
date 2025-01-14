import type { Meta, StoryFn } from "@storybook/react";

import { FileUploader } from "./fileUploader";

export default {
  title: "FileUploader",
  component: FileUploader,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A file uploader component that supports drag-and-drop functionality, previews, progress indicators, and file upload management. Supports images, PDFs, and Word documents.",
      },
    },
  },
  argTypes: {
    // No specific props for this component, but could include upload handlers or customization options.
  },
} as Meta;

const Template: StoryFn = (args) => (
  <FileUploader onFileUpload={() => Promise.resolve()} {...args} />
);

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  docs: {
    description: {
      story:
        "The default configuration of the `FileUploader` component. Drag and drop files, or click to upload. Supports images, PDFs, and Word documents with a progress bar and status indicators.",
    },
  },
};
