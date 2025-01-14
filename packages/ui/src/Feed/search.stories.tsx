import type { Meta, StoryFn } from "@storybook/react";

import type { FeedPost } from "./";
import { FeedSearch } from "./search";

export default {
  title: "Feed/Search",
  component: FeedSearch,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    setPosts: { action: "setPosts" },
  },
} as Meta<typeof FeedSearch>;

const Template: StoryFn<typeof FeedSearch> = (args) => <FeedSearch {...args} />;

const samplePosts: FeedPost[] = [
  {
    id: "1",
    title: "Searchable Feed Post 1",
    excerpt: "This is a searchable Feed post.",
    author: "John Doe",
    date: "2023-06-01",
    likes: 120,
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    title: "Searchable Feed Post 2",
    excerpt: "This is a searchable Feed post.",
    author: "Jane Smith",
    date: "2023-06-02",
    likes: 85,
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
];

export const Default = Template.bind({});
Default.args = {
  posts: samplePosts,
};
