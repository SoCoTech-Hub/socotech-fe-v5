import React from "react";

import { NoteSearch } from "@acme/ui";
import { NotesTable } from "@acme/ui";

export default function Home() {
  return (
    <div>
      <NoteSearch />
      <NotesTable />
    </div>
  );
}
