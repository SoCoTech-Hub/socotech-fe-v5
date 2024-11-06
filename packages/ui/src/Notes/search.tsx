import React, { useCallback, useState } from "react";
import Fuse from "fuse.js";
import { Search } from "lucide-react";

import { Debounce } from "@acme/snippets";

import { Input } from "../input";

interface Note {
  id: string;
  created_at: string;
  note: string;
  subject: {
    name: string;
  };
}

interface NoteSearchProps {
  notes: Note[];
  setNoteList: (filteredNotes: Note[]) => void;
  placeholder?: string;
  debounceTime?: number;
}

export const NoteSearch: React.FC<NoteSearchProps> = ({
  notes,
  setNoteList,
  placeholder = "Search notes...",
  debounceTime = 300,
}) => {
  const [search, setSearch] = useState("");

  const filterNotes = useCallback(
    (searchTerm: string) => {
      const fuse = new Fuse(notes, {
        keys: ["created_at", "note", "subject.name"],
        threshold: 0.4,
      });
      const results = fuse.search(searchTerm);
      setNoteList(searchTerm ? results.map((result) => result.item) : notes);
    },
    [notes, setNoteList],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    debounceFilterNotes(searchTerm);
  };

  // Debounce to prevent excessive re-rendering.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFilterNotes = useCallback(
    Debounce((searchTerm: string) => filterNotes(searchTerm), debounceTime),
    [filterNotes, debounceTime],
  );

  return (
    <div className="w-full max-w-sm">
      <div className="relative">
        <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          className="pl-10 pr-4"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};
