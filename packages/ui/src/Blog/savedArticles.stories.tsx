import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { BlogPost } from "./index";
import SavedArticlesList from "./savedArticles";

export default {
  title: "Components/SavedArticlesList",
  component: SavedArticlesList,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onRemove: { action: "onRemove" },
  },
} as Meta<typeof SavedArticlesList>;

const Template: StoryFn<typeof SavedArticlesList> = (args) => (
  <SavedArticlesList {...args} />
);

const samplePosts: BlogPost[] = [
  {
    id: "1",
    title: "Saved Blog Post 1",
    excerpt: "This is a saved blog post.",
    author: "John Doe",
    date: "2023-06-01",
    likes: 120,
    saved: true,
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    title: "Saved Blog Post 2",
    excerpt: "This is a saved blog post.",
    author: "Jane Smith",
    date: "2023-06-02",
    likes: 85,
    saved: true,
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
];

export const Default = Template.bind({});
Default.args = {
  savedPosts: samplePosts,
};
