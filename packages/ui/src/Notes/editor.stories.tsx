import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { NoteEditor } from "./editor";

const meta: Meta<typeof NoteEditor> = {
  title: "Notes/Editor",
  component: NoteEditor,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onSave: { action: "onSave" },
    onCancel: { action: "onCancel" },
  },
};

export default meta;
type Story = StoryObj<typeof NoteEditor>;

// Mock Subjects
const subjects = [
  { id: "1", name: "Math" },
  { id: "2", name: "Science" },
  { id: "3", name: "History" },
];

// Mock Note
const note = {
  id: "1",
  name: "My Math Note",
  subject: { id: "1", name: "Math" },
  note: "This is a math note.",
  read: true,
};

export const Default: Story = {
  render: (args) => {
    const [noteData, setNoteData] = React.useState(note);

    return (
      <NoteEditor
        {...args}
        subjects={subjects}
        note={noteData}
        onSave={() => {
          setNoteData({ ...noteData, name: "Updated Note" });
          args.onSave();
        }}
      />
    );
  },
};

export const NewNote: Story = {
  render: (args) => {
    return <NoteEditor {...args} subjects={subjects} />;
  },
};

export const LoadingState: Story = {
  render: (args) => {
    return <NoteEditor {...args} subjects={subjects} />;
  },
};
