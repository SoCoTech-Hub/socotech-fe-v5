import type { Meta, StoryFn } from "@storybook/react";

import type { ShowGridProps } from "./grid";
import { ShowGrid } from "./grid";

export default {
  title: "Shows/Grid",
  component: ShowGrid,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof ShowGrid>;

const Template: StoryFn<ShowGridProps> = (args) => <ShowGrid {...args} />;

const sampleShows = [
  {
    id: "1",
    title: "The Art of Programming",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    title: "Data Structures and Algorithms",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "3",
    title: "Web Development Masterclass",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
];

export const Populated = Template.bind({});
Populated.args = {
  shows: sampleShows,
  isLoading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  shows: [],
  isLoading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  shows: [],
  isLoading: false,
};
