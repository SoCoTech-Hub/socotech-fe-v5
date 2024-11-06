import type { Meta, StoryObj } from "@storybook/react";

import { NotesTable } from "./table";

const meta: Meta<typeof NotesTable> = {
  title: "Notes/Table",
  component: NotesTable,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    notes: {
      control: "object",
      description: "Array of note objects to display",
    },
    isLoading: {
      control: "boolean",
      description: "Whether the component is loading",
      defaultValue: false,
    },
    refetchNotes: {
      action: "refetchNotes",
      description: "Function to refetch notes after a delete operation",
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotesTable>;

// Sample notes data for demonstration
const sampleNotes = [
  {
    id: "1",
    created_at: "2023-09-25",
    name: "Meeting Notes",
    subject: { name: "Work" },
  },
  {
    id: "2",
    created_at: "2023-09-26",
    name: "Shopping List",
    subject: { name: "Personal" },
  },
  {
    id: "3",
    created_at: "2023-09-27",
    name: "Project Plan",
    subject: { name: "Work" },
  },
];

export const Default: Story = {
  args: {
    notes: sampleNotes,
    isLoading: false,
    refetchNotes: () => {
      console.log("Refetching notes...");
    },
  },
};

export const Loading: Story = {
  args: {
    notes: [],
    isLoading: true,
    refetchNotes: () => {
      console.log("Refetching notes...");
    },
  },
};

export const NoNotes: Story = {
  args: {
    notes: [],
    isLoading: false,
    refetchNotes: () => {
      console.log("Refetching notes...");
    },
  },
};
