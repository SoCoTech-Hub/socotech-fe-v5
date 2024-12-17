import type { Meta, StoryFn } from "@storybook/react";

import InfosPage from ".";

export default {
  title: "Infos/Page",
  component: InfosPage,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof InfosPage>;

const Template: StoryFn = () => <InfosPage />;

export const Default = Template.bind({});
