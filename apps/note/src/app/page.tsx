import React, { useState } from "react";

import { NoteSearch, NoteSearchProps, NotesTable } from "@acme/ui"; // Import NoteSearchProps for type safety

// TODO:replace this with your actual notes data
const mockNotes: NoteSearchProps["notes"] = [
  {
    id: "1",
    created_at: "2025-01-01",
    note: "First note example",
    subject: {
      name: "Math",
    },
  },
  {
    id: "2",
    created_at: "2025-01-02",
    note: "Second note example",
    subject: {
      name: "Science",
    },
  },
  {
    id: "3",
    created_at: "2025-01-03",
    note: "Another example",
    subject: {
      name: "History",
    },
  },
];

const Home: React.FC = () => {
  const [noteList, setNoteList] = useState<NoteSearchProps["notes"]>(mockNotes); // State to hold filtered notes

  return (
    <div>
      <NoteSearch
        notes={mockNotes} // Pass the full list of notes
        setNoteList={setNoteList} // Pass the function to update the filtered list
        placeholder="Search notes by date, content, or subject..." // Optional placeholder
      />
      <NotesTable notes={noteList} /> {/* Render the filtered notes */}
    </div>
  );
};

export default Home;
