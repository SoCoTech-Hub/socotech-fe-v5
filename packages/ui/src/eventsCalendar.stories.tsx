import type { Meta, StoryObj } from "@storybook/react";

import EventsCalendar from "./eventsCalendar";

const meta: Meta<typeof EventsCalendar> = {
  title: "EventsCalendar",
  component: EventsCalendar,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof EventsCalendar>;

export const Default: Story = {
  render: (args) => <EventsCalendar {...args} />,
  args: {},
};
