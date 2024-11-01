// import * as React from "react"
// import Box from "@mui/material/Box"
// import InputLabel from "@mui/material/InputLabel"
// import FormControl from "@mui/material/FormControl"
// import NativeSelect from "@mui/material/NativeSelect"

// interface Filter {
//   id: string
//   display: string
// }

// interface FilterDropdownProps {
//   filterName?: string
//   filters?: Filter[]
//   // setOption?: (option: string) => void // Uncomment this if setOption is needed
// }

// const FilterDropdown: React.FC<FilterDropdownProps> = ({
//   filterName = "Filter",
//   filters = [],
//   // setOption,
// }) => {
//   return (
//     <Box sx={{ minWidth: 120 }}>
//       <FormControl fullWidth>
//         <InputLabel variant="standard" htmlFor="uncontrolled-native">
//           {filterName}
//         </InputLabel>
//         <NativeSelect>
//           {filters.length ? (
//             filters.map((filter) => (
//               <option
//                 key={filter.id}
//                 // value={filter.name}
//                 // click={() => setOption && setOption(filter.name)} // Uncomment this if setOption is needed
//               >
//                 {filter.display}
//               </option>
//             ))
//           ) : (
//             <option>No Filters Available</option>
//           )}
//         </NativeSelect>
//       </FormControl>
//     </Box>
//   )
// }

// export default FilterDropdown
'use client'

import React, { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from "@acme/ui"
import { Button } from "@acme/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu"

export interface FilterOption {
  id: string
  label: string
}

interface FilterDropdownProps {
  options: FilterOption[]
  selectedOptions: string[]
  onFilterChange: (selectedOptions: string[]) => void
  label: string
  className?: string
}

export function FilterDropdown({
  options,
  selectedOptions,
  onFilterChange,
  label,
  className,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOptionToggle = (optionId: string) => {
    const updatedOptions = selectedOptions.includes(optionId)
      ? selectedOptions.filter(id => id !== optionId)
      : [...selectedOptions, optionId]
    onFilterChange(updatedOptions)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between",
            isOpen && "border-primary",
            className
          )}
        >
          {label}
          <ChevronDown className={cn(
            "ml-2 h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )} />
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
                selectedOptions.includes(option.id) ? "opacity-100" : "opacity-0"
              )}
            />
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}