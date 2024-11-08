"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

interface DateTimePickFieldProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  label?: string;
}

export function DateTimePickField({
  value,
  onChange,
  label = "Pick date and time",
}: DateTimePickFieldProps) {
  const [date, setDate] = useState<Date | undefined>(value);

  // Handles changes to the selected date
  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      // Create a new date object combining the selected date with the existing time
      const newDateTime = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate(),
        date ? date.getHours() : 0, // Use existing hours if available, otherwise default to 0
        date ? date.getMinutes() : 0, // Use existing minutes if available, otherwise default to 0
      );
      setDate(newDateTime);
      onChange(newDateTime);
    } else {
      // If no date is selected, reset the date state
      setDate(undefined);
      onChange(undefined);
    }
  };

  // Handles changes to the selected time
  const handleTimeChange = (time: string) => {
    if (date) {
      // Split the time string into hours and minutes and convert them to numbers
      const [hours, minutes] = time.split(":").map(Number) as [number, number];
      const newDateTime = new Date(date);
      newDateTime.setHours(hours); // Set the hours on the new date object
      newDateTime.setMinutes(minutes); // Set the minutes on the new date object
      setDate(newDateTime);
      onChange(newDateTime);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "flex w-full items-center justify-start space-x-2 text-left font-normal",
              !date && "text-muted-foreground", // Apply muted text style if no date is selected
            )}
          >
            <CalendarIcon className="h-5 w-5" />
            <span>{date ? format(date, "PPP p") : label}</span>{" "}
            {/* Display formatted date and time or label */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          {/* Calendar component for selecting the date */}
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
          />
          <div className="border-t border-border p-3">
            {/* Time selection dropdown */}
            <Select
              value={date ? format(date, "HH:mm") : undefined}
              onValueChange={handleTimeChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 * 4 }).map((_, index) => {
                  const hours = Math.floor(index / 4); // Calculate hours based on index
                  const minutes = (index % 4) * 15; // Calculate minutes (increments of 15)
                  const timeString = `${hours.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}`; // Format the time string as HH:mm
                  return (
                    <SelectItem key={timeString} value={timeString}>
                      {timeString} {/* Display the time string */}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateTimePickField;
