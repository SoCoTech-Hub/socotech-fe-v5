import type { Meta, StoryFn } from "@storybook/react";

import type { FilterDropdownProps, FilterOption } from "./";
import { FilterDropdown } from "./";

export default {
  title: "FilterDropdown",
  component: FilterDropdown,
} as Meta;

const Template: StoryFn<FilterDropdownProps> = (args) => (
  <FilterDropdown {...args} />
);

const filterOptions: FilterOption[] = [
  { id: "1", label: "Option 1" },
  { id: "2", label: "Option 2" },
  { id: "3", label: "Option 3" },
];

export const DefaultFilterDropdown = Template.bind({});
DefaultFilterDropdown.args = {
  options: filterOptions,
  selectedOptions: [],
  onFilterChange: (selectedOptions) => {
    console.log("Selected filter options: ", selectedOptions);
  },
  label: "Filter Options",
};
