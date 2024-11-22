"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

import { cn } from "..";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { Label } from "../label";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

interface DateTimePickerProps {
  label?: string;
  onChange: (date: Date | undefined) => void;
  value?: Date;
  datePlaceholder?: string;
  timePlaceholder?: string;
}

export function DateTimePicker({
  label = "Event Date and Time",
  onChange,
  value,
  datePlaceholder = "Pick a date",
  timePlaceholder = "Pick a time",
}: DateTimePickerProps) {
  const [date, setDate] = useState<Date | undefined>(value);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  useEffect(() => {
    setDate(value); // Sync internal state with the controlled `value` prop
  }, [value]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDateTime = date ? new Date(date) : new Date();
      newDateTime.setFullYear(selectedDate.getFullYear());
      newDateTime.setMonth(selectedDate.getMonth());
      newDateTime.setDate(selectedDate.getDate());
      setDate(newDateTime);
      onChange(newDateTime);
    }
    setIsDatePickerOpen(false);
  };

  const handleTimeChange = (value: string) => {
    const [hours, minutes] = value.split(":").map(Number);
    const newDateTime = date ? new Date(date) : new Date();
    newDateTime.setHours(hours ?? 0);
    newDateTime.setMinutes(minutes ?? 0);
    setDate(newDateTime);
    onChange(newDateTime);
    setIsTimePickerOpen(false);
  };

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      timeOptions.push(
        `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`,
      );
    }
  }

  return (
    <div className="space-y-2">
      {label && <Label htmlFor="event-date-time">{label}</Label>}
      <div className="flex space-x-2">
        {/* Date Picker */}
        <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button
              id="event-date"
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
              aria-label="Select event date"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>{datePlaceholder}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Time Picker */}
        <Popover open={isTimePickerOpen} onOpenChange={setIsTimePickerOpen}>
          <PopoverTrigger asChild>
            <Button
              id="event-time"
              variant="outline"
              className={cn(
                "w-[140px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
              aria-label="Select event time"
            >
              <Clock className="mr-2 h-4 w-4" />
              {date ? format(date, "HH:mm") : <span>{timePlaceholder}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0" align="start">
            <Select onValueChange={handleTimeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
