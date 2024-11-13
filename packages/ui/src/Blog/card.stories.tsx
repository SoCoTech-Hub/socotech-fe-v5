import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { BlogPost } from "./";
import BlogCard from "./card";

export default {
  title: "Blog/Card",
  component: BlogCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onSave: { action: "onSave" },
    onLike: { action: "onLike" },
    onShare: { action: "onShare" },
  },
} as Meta<typeof BlogCard>;
const Template: StoryFn<typeof BlogCard> = (args) => <BlogCard {...args} />;

const samplePost: BlogPost = {
  id: "1",
  title: "Sample Blog Post",
  excerpt: "This is a brief summary of the blog post.",
  author: "John Doe",
  date: "2023-06-01",
  likes: 120,
  saved: false,
  imageUrl: "/placeholder.svg?height=200&width=400",
};
export const Default = Template.bind({});
Default.args = {
  post: samplePost,
};
