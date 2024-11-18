import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import TicketList from "./list";

export default {
  title: "Support/List",
  component: TicketList,
} as Meta;

const mockTickets = [
  {
    id: 1,
    title: "Frontend Issue",
    description: "Button is not clickable",
    status: "Open",
    created: "2023-10-31",
    location: "Frontend",
  },
  {
    id: 2,
    title: "Backend Issue",
    description: "API is not responding",
    status: "In Progress",
    created: "2023-10-29",
    location: "Backend",
  },
  {
    id: 3,
    title: "Database Issue",
    description: "Query timeout",
    status: "Closed",
    created: "2023-10-25",
    location: "Database",
  },
];

const Template: StoryFn = (args) => <TicketList {...args} />;

export const Default = Template.bind({});
Default.args = {
  tickets: mockTickets,
  onSelectTicket: (ticket) => alert(`Selected Ticket: ${ticket.title}`),
  currentPage: 1,
  totalPages: 1,
  onPageChange: (page) => alert(`Switched to Page ${page}`),
  isLoading: false,
};

export const LoadingState = Template.bind({});
LoadingState.args = {
  tickets: [],
  currentPage: 1,
  totalPages: 1,
  onPageChange: () => {},
  isLoading: true,
};
