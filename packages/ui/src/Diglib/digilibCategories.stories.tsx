import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import DigilibCategories from "./digilibCategories";

const meta: Meta<typeof DigilibCategories> = {
  title: "Digilib/DigilibCategories",
  component: DigilibCategories,
  tags: ["autodocs"],
  argTypes: {
    img: { control: "text" },
    title: { control: "text" },
    imgAlt: { control: "text" },
    description: { control: "text" },
    link: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof DigilibCategories>;

export const Default: Story = {
  args: {
    img: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    title: "Sample Category",
    description: "This is a sample description for a category.",
    link: "/sample-category",
    badge: "New Badge",
  },
};

export const WithLocalImage: Story = {
  args: {
    img: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    title: "Local Image Category",
    imgAlt: "Local Image",
    description: "This category uses a local image.",
    link: "/local-image-category",
  },
};
export const GridLayout: Story = {
  render: () => {
    const categories = [
      {
        img: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        // title: "Mathematics",
        description: "Description for category 1",
        link: "/category-1",
      },
      {
        img: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        title: "Category 2",
        description: "Description for category 2",
        link: "/category-2",
        badge: "New",
      },
      {
        img: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        title: "Category 3",
        description: "Description for category 3",
        link: "/category-3",
      },
      {
        img: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        title: "Category 4",
        description: "Description for category 4",
        link: "/category-4",
      },
      {
        img: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        title: "Category 5",
        description: "Description for category 5",
        link: "/category-5",
      },
    ];

    return (
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
        {categories.map((category, index) => (
          <DigilibCategories key={index} {...category} />
        ))}
      </div>
    );
  },
};
