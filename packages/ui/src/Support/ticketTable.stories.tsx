import type { Meta, StoryObj } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";

import GetSupportTicketsTable from "@acme/snippets/graphql/queries/GetSupportTicketsTable";

import { Skeleton } from "../skeleton";
import { SupportTicketTable } from "./ticketTable";

// Mocked data to simulate the response from the GetSupportTicketsTable query
const mockTickets = [
  {
    id: "123",
    title: "Login Issue",
    supportStatus: { name: "Open" },
    assignedTo: { firstName: "John", lastName: "Doe" },
    supportTopic: { name: "Account" },
  },
  {
    id: "124",
    title: "Payment Error",
    supportStatus: { name: "Resolved" },
    assignedTo: { firstName: "Jane", lastName: "Smith" },
    supportTopic: { name: "Billing" },
  },
];

// Mocked query response for Storybook testing
const mocks = [
  {
    request: {
      query: GetSupportTicketsTable,
      variables: { id: "user123" },
    },
    result: {
      data: {
        supportTickets: mockTickets,
      },
    },
  },
];

// Setting up Storybook Meta configuration
const meta: Meta<typeof SupportTicketTable> = {
  title: "Support/TicketTable",
  component: SupportTicketTable,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onTicketClick: { action: "clicked", description: "Handle ticket click" },
  },
  decorators: [
    (Story) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        <Story />
      </MockedProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SupportTicketTable>;

// Default story showing tickets with data
export const Default: Story = {
  args: {
    onTicketClick: (id: string) => console.log("Ticket clicked:", id),
  },
};

// Story to showcase the loading state
export const Loading: Story = {
  render: () => (
    <div className="w-full">
      <Skeleton />
    </div>
  ),
  args: {
    onTicketClick: (id: string) => console.log("Ticket clicked:", id),
  },
};

// Story to showcase the no tickets state
export const NoTickets: Story = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => (
    <MockedProvider
      mocks={[
        {
          request: {
            query: GetSupportTicketsTable,
            variables: { id: "user123" },
          },
          result: {
            data: {
              supportTickets: [],
            },
          },
        },
      ]}
      addTypename={false}
    >
      <SupportTicketTable {...args} />
    </MockedProvider>
  ),
  args: {
    onTicketClick: (id: string) => console.log("Ticket clicked:", id),
  },
};
