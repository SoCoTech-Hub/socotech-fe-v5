import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import MdxEditor from ".";

const meta: Meta<typeof MdxEditor> = {
  title: "MDX/Editor",
  component: MdxEditor,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "text" },
      description: "The content of the editor.",
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
  args: {},
};
