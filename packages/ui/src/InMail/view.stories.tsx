import type { Meta, StoryObj } from "@storybook/react";

import type { InmailViewProps } from "./view";
import { InmailView } from "./view";

const meta: Meta<typeof InmailView> = {
  title: "Inmail/View",
  component: InmailView,
  tags: ["autodocs"],
  argTypes: {
    onStar: { action: "starred" },
    onTrash: { action: "trashed" },
    onClose: { action: "closed" },
  },
};

export default meta;
type Story = StoryObj<typeof InmailView>;

const sampleEmail: InmailViewProps["email"] = {
  id: 1,
  from: "jane.doe@example.com",
  subject: "Meeting Reminder",
  body: "Hi, just a reminder about our meeting tomorrow at 10 AM.",
  starred: false,
  important: true,
  trash: false,
};

export const Default: Story = {
  render: function DefaultRender(args) {
    return <InmailView {...args} email={sampleEmail} />;
  },
};
