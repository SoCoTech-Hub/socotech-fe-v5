import type { Meta, StoryFn } from "@storybook/react";

import ShowCard from "./card";

export default {
  title: "Shows/Card",
  component: ShowCard,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof ShowCard>;

const Template: StoryFn<typeof ShowCard> = (args) => <ShowCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  show: {
    id: "1",
    title: "The Art of Programming",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
};
