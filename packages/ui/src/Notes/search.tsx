"use client";

import { useCallback, useState } from "react";
import Fuse from "fuse.js";
import { Search } from "lucide-react";

import { Input } from "../input";

interface Note {
  id: string;
  created_at: string;
  note: string;
  subject: {
    name: string;
  };
}

export interface NoteSearchProps {
  notes: Note[];
  setNoteList: (filteredNotes: Note[]) => void;
  placeholder?: string;
  debounceTime?: number;
}

export const NoteSearch: React.FC<NoteSearchProps> = ({
  notes,
  setNoteList,
  placeholder = "Search notes...",
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
    setTimeout(() => {
      filterNotes(searchTerm);
    }, 300);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
