import type { Meta, StoryFn } from "@storybook/react";

import { InfoCard } from "./card";

export default {
  title: "Info/Card",
  component: InfoCard,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof InfoCard>;

const Template: StoryFn<typeof InfoCard> = (args) => <InfoCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  info: {
    id: "1",
    title: "The Art of Programming",
    imageUrl: "/placeholder.svg?height=200&width=400",
  },
};
