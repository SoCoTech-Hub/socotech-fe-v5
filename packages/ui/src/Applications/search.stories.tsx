import type { Meta, StoryObj } from "@storybook/react";

import { SearchFilter } from "./search";

const meta: Meta<typeof SearchFilter> = {
  title: "Applications/SearchFilter",
  component: SearchFilter,
  tags: ["autodocs"],
  argTypes: {
    filterList: [
      { id: "1", name: "Filter 1", field: "field1" },
      { id: "2", name: "Filter 2", field: "field2" },
      { id: "3", name: "Filter 3", field: "field3" },
    ],
    searchQuery: (e: string) => console.log(e),
  },
};

export default meta;
type Story = StoryObj<typeof SearchFilter>;

export const Default: Story = {
  render: (args) => <SearchFilter {...args} />,
  args: {
    searchQuery: (string) => console.log("data list updated:", string),
  },
};
