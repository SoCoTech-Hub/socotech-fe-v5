"use client";

import { Search } from "lucide-react";

import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Input } from "../input";

export interface FilterItem {
  id: string;
  name: string;
  field: string;
}
interface SearchFilterProps {
  filterList: FilterItem[];
  searchQuery?: (e: string) => void;
}

const SearchFilter = (props: SearchFilterProps) => {
  return (
    <div className="flex items-center space-x-2 rounded-lg bg-background p-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Search className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {props.filterList.map((filterItem) => (
            <DropdownMenuItem
              key={filterItem.id}
              onSelect={() =>
                props.searchQuery && props.searchQuery(filterItem.name)
              }
            >
              {filterItem.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Input
        className="flex-grow"
        type="text"
        placeholder="Start typing to search..."
        onChange={(e) => props.searchQuery && props.searchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
