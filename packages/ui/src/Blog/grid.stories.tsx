import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { BlogPost } from "./index";
import BlogGrid from "./grid";

export default {
  title: "Components/BlogGrid",
  component: BlogGrid,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    handleSave: { action: "handleSave" },
    handleLike: { action: "handleLike" },
    handleShare: { action: "handleShare" },
  },
} as Meta<typeof BlogGrid>;

const Template: StoryFn<typeof BlogGrid> = (args) => <BlogGrid {...args} />;

const samplePosts: BlogPost[] = [
  {
    id: "1",
    title: "Sample Blog Post 1",
    excerpt: "This is a brief summary of the blog post.",
    author: "John Doe",
    date: "2023-06-01",
    likes: 120,
    saved: false,
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    title: "Sample Blog Post 2",
    excerpt: "This is a brief summary of the blog post.",
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
  isLoading: false,
};
