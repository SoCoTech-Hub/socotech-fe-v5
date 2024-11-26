"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

import { Button } from "../button";
import { Input } from "../input";

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}
//TODO:add search function
export default function SearchBar({
  onSearch,
  placeholder = "Search...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <div className="relative flex-grow">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
}
