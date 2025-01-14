import type { Meta, StoryFn } from "@storybook/react";

import type { FeedPost } from "./";
import { FeedCard } from "./card";

export default {
  title: "Feed/Card",
  component: FeedCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onSave: { action: "onSave" },
    onLike: { action: "onLike" },
    onShare: { action: "onShare" },
  },
} as Meta<typeof FeedCard>;
const Template: StoryFn<typeof FeedCard> = (args) => <FeedCard {...args} />;

const samplePost: FeedPost = {
  id: "1",
  title: "Sample Feed Post",
  excerpt: "This is a brief summary of the Feed post.",
  author: "John Doe",
  date: "2023-06-01",
  likes: 120,
  imageUrl: "/placeholder.svg?height=200&width=400",
};
export const Default = Template.bind({});
Default.args = {
  post: samplePost,
};
