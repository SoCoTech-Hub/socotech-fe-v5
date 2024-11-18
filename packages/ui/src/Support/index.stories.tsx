import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import TicketingDashboard from "./";

export default {
  title: "Support/Page",
  component: TicketingDashboard,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: StoryFn = (args) => <TicketingDashboard {...args} />;

export const Default = Template.bind({});
Default.args = {};
