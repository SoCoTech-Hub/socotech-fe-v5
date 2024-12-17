/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { NoteSearch } from "./search";

const meta: Meta<typeof NoteSearch> = {
  title: "Notes/Search",
  component: NoteSearch,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    notes: {
      control: "object",
      description: "Array of notes to search through",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the search input",
      defaultValue: "Search notes...",
    },
    debounceTime: {
      control: "number",
      description: "Time in ms to debounce search input",
      defaultValue: 300,
    },
  },
};

export default meta;
type Story = StoryObj<typeof NoteSearch>;

const sampleNotes = [
  {
    id: "1",
    created_at: "2023-10-10",
    note: "First sample note",
    subject: { name: "Math" },
  },
  {
    id: "2",
    created_at: "2023-11-10",
    note: "Second sample note",
    subject: { name: "Science" },
  },
];

export const Default: Story = (args: any) => {
  const [filteredNotes, setFilteredNotes] = useState(sampleNotes);

  return (
    <div>
      <NoteSearch
        {...args}
        notes={sampleNotes}
        setNoteList={setFilteredNotes}
      />
      <ul className="mt-4">
        {filteredNotes.map((note) => (
          <li key={note.id}>
            {note.created_at} - {note.note} ({note.subject.name})
          </li>
        ))}
      </ul>
    </div>
  );
};

Default.args = {
  notes: sampleNotes,
};
