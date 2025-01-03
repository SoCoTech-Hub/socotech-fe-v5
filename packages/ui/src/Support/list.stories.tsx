import type { Meta, StoryFn } from "@storybook/react";

import TicketList, { TicketItem } from "./list";

export default {
  title: "Components/TicketList",
  component: TicketList,
} as Meta;

const Template: StoryFn<{
  tickets: TicketItem[];
  onSelectTicket: (ticket: TicketItem) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}> = (args) => <TicketList {...args} />;

export const DefaultTicketList = Template.bind({});
DefaultTicketList.args = {
  tickets: [
    {
      id: 1,
      title: "Login Issue",
      description: "Unable to login to the system.",
      status: "Open",
      created: "2023-12-01",
      location: "Frontend",
    },
    {
      id: 2,
      title: "Database Timeout",
      description: "Frequent timeout errors in database queries.",
      status: "In Progress",
      created: "2023-12-02",
      location: "Backend",
    },
    {
      id: 3,
      title: "Network Latency",
      description: "High latency observed in network operations.",
      status: "Closed",
      created: "2023-12-03",
      location: "Network",
    },
  ],
  onSelectTicket: (ticket) => {
    console.log("Selected ticket: ", ticket);
  },
  currentPage: 1,
  totalPages: 3,
  onPageChange: (page) => {
    console.log("Page changed to: ", page);
  },
  isLoading: false,
};
