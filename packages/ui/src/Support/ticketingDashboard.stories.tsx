import type { Meta, StoryFn } from "@storybook/react";

import TicketingDashboard, {
  TicketingDashboardProps,
} from "./ticketingDashboard";

export default {
  title: "Components/TicketingDashboard",
  component: TicketingDashboard,
} as Meta;

const Template: StoryFn<TicketingDashboardProps> = (args) => (
  <TicketingDashboard {...args} />
);

export const DefaultTicketingDashboard = Template.bind({});
DefaultTicketingDashboard.args = {
  tickets: [
    {
      id: 1,
      title: "Issue with Login",
      description: "User cannot log in to their account.",
      status: "Open",
      created: "2023-12-01",
      location: "Frontend",
    },
    {
      id: 2,
      title: "Database Timeout",
      description: "Queries are timing out during peak hours.",
      status: "In Progress",
      created: "2023-12-02",
      location: "Database",
    },
    {
      id: 3,
      title: "Network Latency",
      description: "High latency detected in the network.",
      status: "Closed",
      created: "2023-12-03",
      location: "Network",
    },
  ],
  createTicket: (ticket) => {
    console.log("New ticket created: ", ticket);
  },
};
