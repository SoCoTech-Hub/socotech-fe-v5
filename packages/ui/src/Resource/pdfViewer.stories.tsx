import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import PDFViewer from "./pdfViewer";

export default {
  title: "Resource/PDFViewer",
  component: PDFViewer,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    url: { control: "text" },
  },
} as Meta<typeof PDFViewer>;

const Template: StoryObj<typeof PDFViewer> = (args) => <PDFViewer {...args} />;

export const SinglePagePDF = Template.bind({});
SinglePagePDF.args = {
  url: "https://example.com/sample-single-page.pdf",
};

export const MultiPagePDF = Template.bind({});
MultiPagePDF.args = {
  url: "https://example.com/sample-multi-page.pdf",
};

export const LargePDF = Template.bind({});
LargePDF.args = {
  url: "https://example.com/sample-large.pdf",
};
