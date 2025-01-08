import React from "react";

import { NoteSearch } from "@acme/ui/Notes/search";
import { NotesTable } from "@acme/ui/Notes/table";

export default function Home() {
  return (
    <div>
      <NoteSearch />
      <NotesTable />
    </div>
  );
}
