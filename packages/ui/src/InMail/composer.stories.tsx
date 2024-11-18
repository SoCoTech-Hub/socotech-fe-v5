import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import InmailComposer from "./composer";

const meta: Meta<typeof InmailComposer> = {
  title: "Inmail/Composer",
  component: InmailComposer,
  tags: ["autodocs"],
  argTypes: {
    setComposing: { action: "set composing" },
    handleAttachment: { action: "attachment handled" },
  },
};

export default meta;
type Story = StoryObj<typeof InmailComposer>;

export const Default: Story = {
  render: function DefaultRender(args) {
    return <InmailComposer {...args} attachment={null} />;
  },
};

export const WithAttachment: Story = {
  render: function WithAttachmentRender(args) {
    return (
      <InmailComposer {...args} attachment={{ name: "example.pdf" } as File} />
    );
  },
};
