import type { Meta, StoryObj } from "@storybook/react";

import type { InmailListProps } from "./list";
import InmailList from "./list";

const meta: Meta<typeof InmailList> = {
  title: "Inmail/List",
  component: InmailList,
  tags: ["autodocs"],
  argTypes: {
    onSelectEmail: { action: "email selected" },
    onStarEmail: { action: "email starred" },
    onTrashEmail: { action: "email trashed" },
  },
};

export default meta;
type Story = StoryObj<typeof InmailList>;

const sampleEmails: InmailListProps["emails"] = [
  {
    id: 1,
    from: "john.doe@example.com",
    subject: "Project Update",
    body: "Please see the latest project updates attached.",
    starred: false,
    important: true,
    trash: false,
  },
  {
    id: 2,
    from: "jane.smith@example.com",
    subject: "Meeting Agenda",
    body: "The meeting agenda for tomorrow is attached.",
    starred: true,
    important: false,
    trash: false,
  },
  {
    id: 3,
    from: "boss@example.com",
    subject: "Reminder: Quarterly Report",
    body: "Don't forget to submit the quarterly report by Friday.",
    starred: false,
    important: true,
    trash: false,
  },
];

export const Default: Story = {
  render: function DefaultRender(args) {
    return <InmailList {...args} emails={sampleEmails} />;
  },
};
