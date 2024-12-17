import type { Meta, StoryFn } from "@storybook/react";

import type { BlogPost } from "./";
import BlogSearch from "./search";

export default {
  title: "Blog/Search",
  component: BlogSearch,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    setPosts: { action: "setPosts" },
  },
} as Meta<typeof BlogSearch>;

const Template: StoryFn<typeof BlogSearch> = (args) => <BlogSearch {...args} />;

const samplePosts: BlogPost[] = [
  {
    id: "1",
    title: "Searchable Blog Post 1",
    excerpt: "This is a searchable blog post.",
    author: "John Doe",
    date: "2023-06-01",
    likes: 120,
    saved: false,
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    title: "Searchable Blog Post 2",
    excerpt: "This is a searchable blog post.",
    author: "Jane Smith",
    date: "2023-06-02",
    likes: 85,
    saved: false,
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
];

export const Default = Template.bind({});
Default.args = {
  posts: samplePosts,
};
