import type { Meta, StoryObj } from "@storybook/react";

import { MDXPreview } from "./preview";

const meta: Meta<typeof MDXPreview> = {
  title: "MDX/Preview",
  component: MDXPreview,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "text" },
      description: "The content from the editor.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MDXPreview>;

export const Default: Story = {
  render: function DefaultRender(args) {
    return <MDXPreview {...args} value={args.value} />;
  },
  args: {
    value:
      "<h1>Welcome</h1> to the <h2>MDX Preview!<h2/><br/>View your content here...",
  },
};
