/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "./";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Skeleton } from "./skeleton";

interface SearchableDropdownProps {
  items?: { value: string; label: string }[];
  placeholder?: string;
  emptyMessage?: string;
  onChange?: (value: string) => void;
}

export default function SearchableDropdown({
  items,
  placeholder = "Select an item...",
  emptyMessage = "No items found.",
  onChange,
}: SearchableDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  console.log({ items, value });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? items?.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search items..." />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-auto">
            {!items ? (
              // Skeleton loading state
              <>
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="px-2 py-1.5">
                    <Skeleton className="h-5 w-full" />
                  </div>
                ))}
              </>
            ) : (
              items.map((item, index) => (
                <CommandItem
                  key={`${item.value}-${index}`}
                  onSelect={(currentValue) => {
                    setValue(currentValue == value ? "" : item.value);
                    onChange?.(currentValue == value ? "" : item.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value == item.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
