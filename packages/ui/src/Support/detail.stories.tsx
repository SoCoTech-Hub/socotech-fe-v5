import type { Meta, StoryFn } from "@storybook/react";

import { TicketDetail, TicketDetailProps } from "./detail";

export default {
  title: "Support/TicketDetail",
  component: TicketDetail,
} as Meta;

const Template: StoryFn<TicketDetailProps> = (args) => (
  <TicketDetail {...args} />
);

export const DefaultTicketDetail = Template.bind({});
DefaultTicketDetail.args = {
  ticket: {
    id: 1234,
    title: "Account Access Issue",
    description:
      "The user is unable to access their account despite entering the correct credentials. They are receiving an 'Invalid credentials' error.",
    status: "Open",
    created: "2023-06-01",
    location: "New York, NY",
  },
};
