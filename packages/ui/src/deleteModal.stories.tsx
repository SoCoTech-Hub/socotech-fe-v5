import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import { DeleteModal } from "./deleteModal";

const meta: Meta<typeof DeleteModal> = {
  title: "DeleteModal",
  component: DeleteModal,
  argTypes: {
    id: {
      control: "text",
      description: "ID of the item to delete",
      defaultValue: "note-123",
    },
    name: {
      control: "text",
      description: "Name of the item to be displayed in the modal",
      defaultValue: "Sample Note",
    },
    triggerName: {
      control: "text",
      description: "Name of the button to trigger the modal",
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryFn<typeof DeleteModal>;

const Template: Story = (args) => {
  const mockRefetchNotes = () => alert("Refetch notes called");
  const mockOnDelete = (id: string) => alert(`Deleted note with ID: ${id}`);

  return (
    <DeleteModal
      {...args}
      refetchData={mockRefetchNotes}
      onDelete={mockOnDelete}
    />
  );
};

export const Default: Story = Template.bind({});
Default.args = {
  id: "note-123",
  name: "Sample Note",
  triggerName: "Delete",
};
