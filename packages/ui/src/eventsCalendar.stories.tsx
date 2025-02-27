import type { Meta, StoryObj } from "@storybook/react";

import { EnhancedTaskCalendar } from "./eventsCalendar";

const meta: Meta<typeof EnhancedTaskCalendar> = {
  title: "EventsCalendar",
  component: EnhancedTaskCalendar,
  tags: ["autodocs"],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof EnhancedTaskCalendar>;

export const Default: Story = {
  render: (args) => <EnhancedTaskCalendar {...args} />,
  args: {},
};
