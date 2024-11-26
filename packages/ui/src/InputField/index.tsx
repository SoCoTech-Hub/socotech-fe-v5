import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar, Eye, EyeOff } from "lucide-react";

import { cn } from "@acme/ui";

import { Button } from "../button";
import { Calendar as CalendarComponent } from "../calendar";
import { Input } from "../input";
import { Label } from "../label";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

export interface InputFieldProps {
  type: "text" | "password" | "date";
  label: string;
  placeholder?: string;
  value: string | Date;
  onChange: (value: string | Date) => void;
  className?: string;
  error?: string;
}

export function InputField({
  type,
  label,
  placeholder,
  value,
  onChange,
  className,
  error,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onChange(date);
      setCalendarOpen(false);
    }
  };

  const renderInput = () => {
    switch (type) {
      case "password":
        return (
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              value={value as string}
              onChange={handleInputChange}
              className={cn("pr-10", error && "border-red-500")}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
        );
      case "date":
        return (
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !value && "text-muted-foreground",
                  error && "border-red-500",
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {value instanceof Date ? (
                  format(value, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={value instanceof Date ? value : undefined}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );
      default:
        return (
          <Input
            type="text"
            placeholder={placeholder}
            value={value as string}
            onChange={handleInputChange}
            className={cn(error && "border-red-500")}
          />
        );
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={label}>{label}</Label>
      {renderInput()}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
