"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { cn } from "../utils";

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterDropdownProps {
  options: FilterOption[];
  selectedOptions: string[];
  onFilterChange: (selectedOptions: string[]) => void;
  label: string;
  className?: string;
}

export function FilterDropdown({
  options,
  selectedOptions,
  onFilterChange,
  label,
  className,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionToggle = (optionId: string) => {
    const updatedOptions = selectedOptions.includes(optionId)
      ? selectedOptions.filter((id) => id !== optionId)
      : [...selectedOptions, optionId];
    onFilterChange(updatedOptions);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between",
            isOpen && "border-primary",
            className,
          )}
        >
          {label}
          <ChevronDown
            className={cn(
              "ml-2 h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.id}
            checked={selectedOptions.includes(option.id)}
            onCheckedChange={() => handleOptionToggle(option.id)}
          >
            <Check
              className={cn(
                "mr-2 h-4 w-4",
                selectedOptions.includes(option.id)
                  ? "opacity-100"
                  : "opacity-0",
              )}
            />
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
