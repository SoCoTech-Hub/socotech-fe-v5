// TODO:data fetch

"use client";

import React, { useState } from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "../button";
import { Checkbox } from "../checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../command";
import { Label } from "../label";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

interface FilterOption {
  id: string;
  label: string;
}

interface ApplicationFilterProps {
  statuses: FilterOption[];
  departments: FilterOption[];
  onFilterChange: (filters: {
    statuses: string[];
    departments: string[];
  }) => void;
}

export function ApplicationFilter({
  statuses,
  departments,
  onFilterChange,
}: ApplicationFilterProps) {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [statusOpen, setStatusOpen] = useState(false);
  const [departmentOpen, setDepartmentOpen] = useState(false);

  const handleStatusChange = (statusId: string) => {
    setSelectedStatuses((current) =>
      current.includes(statusId)
        ? current.filter((id) => id !== statusId)
        : [...current, statusId],
    );
  };

  const handleDepartmentChange = (departmentId: string) => {
    setSelectedDepartments((current) =>
      current.includes(departmentId)
        ? current.filter((id) => id !== departmentId)
        : [...current, departmentId],
    );
  };

  const applyFilters = () => {
    onFilterChange({
      statuses: selectedStatuses,
      departments: selectedDepartments,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Popover open={statusOpen} onOpenChange={setStatusOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={statusOpen}
              className="w-[200px] justify-between"
            >
              {selectedStatuses.length > 0
                ? `${selectedStatuses.length} status${selectedStatuses.length > 1 ? "es" : ""} selected`
                : "Select statuses"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search status..." />
              <CommandEmpty>No status found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.id}
                    onSelect={() => handleStatusChange(status.id)}
                  >
                    <Checkbox
                      checked={selectedStatuses.includes(status.id)}
                      onCheckedChange={() => handleStatusChange(status.id)}
                    />
                    <Label className="ml-2">{status.label}</Label>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover open={departmentOpen} onOpenChange={setDepartmentOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={departmentOpen}
              className="w-[200px] justify-between"
            >
              {selectedDepartments.length > 0
                ? `${selectedDepartments.length} department${selectedDepartments.length > 1 ? "s" : ""} selected`
                : "Select departments"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search department..." />
              <CommandEmpty>No department found.</CommandEmpty>
              <CommandGroup>
                {departments.map((department) => (
                  <CommandItem
                    key={department.id}
                    onSelect={() => handleDepartmentChange(department.id)}
                  >
                    <Checkbox
                      checked={selectedDepartments.includes(department.id)}
                      onCheckedChange={() =>
                        handleDepartmentChange(department.id)
                      }
                    />
                    <Label className="ml-2">{department.label}</Label>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <Button onClick={applyFilters}>Apply Filters</Button>
    </div>
  );
}
