"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "..";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { Label } from "../label";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

interface DatePickerProps {
  label?: string;
  onChange: (date: Date | undefined) => void;
  value?: Date;
  minimumAge?: number; // Minimum age in years
  maxAge?: number; // Maximum age in years
  className?: string; // Additional class names for customization
}

export function DatePicker({
  label,
  onChange,
  value,
  minimumAge = 0,
  maxAge = 120,
  className,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(value);

  useEffect(() => {
    setDate(value); // Sync internal state with the controlled `value` prop
  }, [value]);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    onChange(selectedDate);
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - minimumAge);

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - maxAge);

  const isDateInvalid = date && (date > maxDate || date < minDate);

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor={label}>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={label}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
            aria-describedby={isDateInvalid ? `${label}-error` : undefined}
            aria-invalid={isDateInvalid ? "true" : "false"}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            disabled={(date) => date > maxDate || date < minDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {isDateInvalid && (
        <p id={`${label}-error`} className="text-sm text-destructive">
          Please select a valid {label?.toLowerCase() ?? "date"}.
        </p>
      )}
    </div>
  );
}
