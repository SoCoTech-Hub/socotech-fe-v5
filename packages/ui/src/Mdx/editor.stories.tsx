import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import MdxEditor from ".";

const meta: Meta<typeof MdxEditor> = {
  title: "Components/MdxEditor",
  component: MdxEditor,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "text" },
      description: "The content of the editor.",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text to show when the editor is empty.",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the editor is read-only.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MdxEditor>;

export const Default: Story = {
  render: function DefaultRender(args) {
    const [value, setValue] = useState("");
    return <MdxEditor {...args} value={value} setValue={setValue} />;
  },
  args: {
    placeholder: "Compose your message here...",
    disabled: false,
  },
};
