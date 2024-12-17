import type { Meta, StoryFn } from "@storybook/react";

import type { InfoGridProps } from "./grid";
import InfoGrid from "./grid";

export default {
  title: "Infos/Grid",
  component: InfoGrid,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof InfoGrid>;

const Template: StoryFn<InfoGridProps> = (args) => <InfoGrid {...args} />;

const sampleInfos = [
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
  infos: sampleInfos,
  isLoading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  infos: [],
  isLoading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  infos: [],
  isLoading: false,
};
