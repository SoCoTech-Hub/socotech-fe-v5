import type { Meta, StoryFn } from "@storybook/react";

import type { FeedPost } from "./index";
import { FeedGrid } from "./grid";

export default {
  title: "Feed/Grid",
  component: FeedGrid,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    handleSave: { action: "handleSave" },
    handleLike: { action: "handleLike" },
    handleShare: { action: "handleShare" },
  },
} as Meta<typeof FeedGrid>;

const Template: StoryFn<typeof FeedGrid> = (args) => <FeedGrid {...args} />;

const samplePosts: FeedPost[] = [
  {
    id: "1",
    title: "Sample Feed Post 1",
    excerpt: "This is a brief summary of the Feed post.",
    author: "John Doe",
    date: "2023-06-01",
    likes: 120,
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    title: "Sample Feed Post 2",
    excerpt: "This is a brief summary of the Feed post.",
    author: "Jane Smith",
    date: "2023-06-02",
    likes: 85,
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
];

export const Default = Template.bind({});
Default.args = {
  posts: samplePosts,
  isLoading: false,
};
