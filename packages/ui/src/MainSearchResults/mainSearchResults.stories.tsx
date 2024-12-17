import type { Meta, StoryFn } from "@storybook/react";

import type { SearchBarProps } from ".";
import SearchBar from ".";

export default {
  title: "Search/MainSearchBar",
  component: SearchBar,
} as Meta;

const Template: StoryFn<SearchBarProps> = (args) => <SearchBar {...args} />;

export const DefaultSearchBar = Template.bind({});
DefaultSearchBar.args = {
  onSearch: (query) => {
    console.log("Search query: ", query);
  },
  placeholder: "Search for lessons...",
};
