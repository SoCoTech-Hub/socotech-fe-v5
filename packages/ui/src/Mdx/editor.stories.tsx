import type { Meta, StoryObj } from "@storybook/react";

import { MDXEditor } from "./editor";

const meta: Meta<typeof MDXEditor> = {
  title: "MDX/Editor",
  component: MDXEditor,
  tags: ["autodocs"],
  argTypes: {
    initialValue: {
      control: { type: "text" },
      description: "The initial content of the editor.",
    },
    onSave: {
      control: { type: "object" },
      description: "Save the content using a function",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MDXEditor>;

export const Default: Story = {
  render: function DefaultRender(args) {
    return (
      <MDXEditor
        {...args}
        initialValue={args.initialValue}
        onSave={args.onSave}
      />
    );
  },
  args: {
    initialValue:
      "<h1>Welcome</h1> to the <h2>MDX Editor!</h2><br/>Update your content here...",
    onSave: (e: string) => console.log(e),
  },
};
