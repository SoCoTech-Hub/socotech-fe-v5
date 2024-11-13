import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import MatrixSortDropdown from "./";

const meta: Meta<typeof MatrixSortDropdown> = {
  title: "Components/MatrixSortDropdown",
  component: MatrixSortDropdown,
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: { type: "object" },
      description: "The items to be sorted into categories.",
    },
    categories: {
      control: { type: "object" },
      description: "The categories into which items are sorted.",
    },
    onComplete: {
      action: "onComplete",
      description: "Callback function triggered when sorting is completed.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MatrixSortDropdown>;

export const Default: Story = {
  render: function DefaultRender(args) {
    const [items] = useState([
      { id: "1", content: "Item 1" },
      { id: "2", content: "Item 2" },
      { id: "3", content: "Item 3" },
    ]);

    const [categories] = useState([
      { id: "a", name: "Category A" },
      { id: "b", name: "Category B" },
      { id: "c", name: "Category C" },
    ]);

    return (
      <MatrixSortDropdown {...args} items={items} categories={categories} />
    );
  },
  args: {},
};
