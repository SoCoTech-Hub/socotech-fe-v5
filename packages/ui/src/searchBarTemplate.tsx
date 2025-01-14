"use client";

import { useCallback, useState } from "react";
import { Search, X } from "lucide-react";

import { Button } from "./button";
import { Input } from "./input";

interface SearchBarProps {
  initData?: { title: string; excerpt: string; author: string }[]; // Example data type
  onSearch: (
    query: { title: string; excerpt: string; author: string }[],
  ) => void;
  placeholder?: string;
  initialQuery?: string;
}

export function SearchBarTemplate({
  initData = [], // Default to empty array if not provided
  onSearch,
  placeholder = "Search...",
  initialQuery = "",
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);

  const filteredData = initData.filter(
    (data) =>
      data.title.toLowerCase().includes(query.toLowerCase()) ||
      data.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      data.author.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSearch = useCallback(() => {
    onSearch(filteredData);
  }, [filteredData, onSearch]);

  const handleClear = useCallback(() => {
    setQuery("");
    onSearch(initData); // Reset to original data
  }, [initData, onSearch]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch],
  );

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <div className="relative w-full">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-8 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
