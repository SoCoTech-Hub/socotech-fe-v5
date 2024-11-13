"use client";

import { useCallback, useState } from "react";
import { Search, X } from "lucide-react";

import { Button } from "./button";
import { Input } from "./input";

interface SearchBarProps {
  initData?: []; //TODO: populate with data to search
  onSearch: (query: []) => void;//TODO: update data type, usually useState function datatype
  placeholder?: string;
  initialQuery?: string;
}

export default function SearchBar({
  initData,
  onSearch,
  placeholder = "Search...", // TODO: update search term
  initialQuery = "",
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const filteredData = initData?.filter(
    (
      data, //TODO: Update filter for which to seach
    ) =>
      // data.title.toLowerCase().includes(query.toLowerCase()) ||
      // data.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      // data.author.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSearch = useCallback(() => {
    onSearch(filteredData);
  }, [query, onSearch]);

  const handleClear = useCallback(() => {
    setQuery("");
    onSearch(initData);//TODO: check here
  }, [onSearch]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch],
  );

  return (
    <div className="flex items-center w-full max-w-sm space-x-2">
      <div className="relative w-full">
        <Search className="absolute w-4 h-4 -translate-y-1/2 left-2 top-1/2 text-muted-foreground" />
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
            className="absolute top-0 right-0 h-full"
            onClick={handleClear}
          >
            <X className="w-4 h-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}
