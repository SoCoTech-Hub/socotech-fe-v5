import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { DeleteModal } from "./";

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
    isOpen: {
      control: "boolean",
      description: "Controls the open state of the modal",
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof DeleteModal>;

const Template: Story = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  const mockRefetchNotes = () => alert("Refetch notes called");
  const mockOnDelete = async (id: string) =>
    alert(`Deleted note with ID: ${id}`);

  return (
    <DeleteModal
      {...args}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      refetchNotes={mockRefetchNotes}
      onDelete={mockOnDelete}
    />
  );
};

export const Default: Story = Template.bind({});
Default.args = {
  id: "note-123",
  name: "Sample Note",
};
