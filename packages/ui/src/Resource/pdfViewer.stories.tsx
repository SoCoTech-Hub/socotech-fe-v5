import type { Meta, StoryObj } from "@storybook/react";

import { PDFViewer } from "./pdfViewer";

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

type Story = StoryObj<typeof PDFViewer>;

export const SinglePagePDF: Story = {
  args: {
    url: "https://example.com/sample-single-page.pdf",
  },
};

export const MultiPagePDF: Story = {
  args: {
    url: "https://example.com/sample-multi-page.pdf",
  },
};

export const LargePDF: Story = {
  args: {
    url: "https://example.com/sample-large.pdf",
  },
};

export const InvalidPDF: Story = {
  args: {
    url: "https://example.com/invalid-pdf.pdf",
  },
};
