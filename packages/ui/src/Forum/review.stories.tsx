import type { Meta, StoryObj } from "@storybook/react";

import ForumPostView from "./review";

const meta: Meta<typeof ForumPostView> = {
  title: "Forum/PostView",
  component: ForumPostView,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ForumPostView>;

const date = new Date();
export const Default: Story = {
  render: function DefaultRender() {
    return (
      <ForumPostView
        author=""
        content=""
        createdAt={date}
        likes={5}
        replies={[]}
        title="a"
        id="6"
      />
    );
  },
};
