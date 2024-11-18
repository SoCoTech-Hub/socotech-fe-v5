import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import TicketDetail from "./detail";

export default {
  title: "Support/Detail",
  component: TicketDetail,
} as Meta;

const Template: StoryFn = (args) => <TicketDetail {...args} />;

export const Default = Template.bind({});
Default.args = {
  ticket: {
    id: 123,
    title: "Login Issues",
    description: "Unable to log in using my email credentials.",
    status: "Open",
    created: "2023-11-01",
    location: "Frontend",
  },
};
