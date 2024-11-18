import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import SearchableDropdown from "./dropdownSelect";

export default {
  title: "DropdownSelect",
  component: SearchableDropdown,
  argTypes: {
    onChange: { action: "value changed" },
  },
} as Meta;

const Template: StoryFn = (args) => <SearchableDropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ],
  placeholder: "Select a fruit...",
  emptyMessage: "No fruits found.",
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  items: [],
  placeholder: "Select a fruit...",
  emptyMessage: "No fruits available.",
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  items: null, // Simulates loading state
  placeholder: "Select a fruit...",
  emptyMessage: "No fruit found.",
};
