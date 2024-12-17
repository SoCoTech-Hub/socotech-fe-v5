import type { Meta, StoryFn } from "@storybook/react";

import ShowsPage from ".";

export default {
  title: "Shows/Page",
  component: ShowsPage,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof ShowsPage>;

const Template: StoryFn = () => <ShowsPage />;

export const Default = Template.bind({});
