import type { Meta, StoryObj } from "@storybook/react";

import { ApplicationFilter } from "./filter";

const meta: Meta<typeof ApplicationFilter> = {
  title: "Applications/Filter",
  component: ApplicationFilter,
  tags: ["autodocs"],
  argTypes: {
    statuses: {
      control: { type: "object" },
      description: "A list of status filter options.",
    },
    departments: {
      control: { type: "object" },
      description: "A list of department filter options.",
    },
    onFilterChange: {
      action: "filtersChanged",
      description: "Handler called when filters are applied.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ApplicationFilter>;

const statuses = [
  { id: "1", label: "Pending" },
  { id: "2", label: "Approved" },
  { id: "3", label: "Rejected" },
];

const departments = [
  { id: "1", label: "Engineering" },
  { id: "2", label: "Marketing" },
  { id: "3", label: "Sales" },
];

export const Default: Story = {
  render: (args) => <ApplicationFilter {...args} />,
  args: {
    statuses: statuses,
    departments: departments,
  },
};

export const NoStatuses: Story = {
  render: (args) => <ApplicationFilter {...args} />,
  args: {
    statuses: [],
    departments: departments,
  },
};

export const NoDepartments: Story = {
  render: (args) => <ApplicationFilter {...args} />,
  args: {
    statuses: statuses,
    departments: [],
  },
};
