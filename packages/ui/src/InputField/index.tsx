// import { ChangeEvent, useState } from "react";
// import { EyeActiveIcon, EyeIcon, LockIcon } from "@/components/SvgIcons";

// interface InputFieldProps {
//   id?: string;
//   placeholder?: string;
//   icon?: string;
//   type?: "text" | "password" | "email" | "date" | "checkbox";
//   onChange: (event: ChangeEvent<HTMLInputElement>) => void;
//   value: string | boolean;
//   max?: number;
// }

// const InputField = ({
//   id = "input",
//   placeholder = "Input Text Here",
//   icon,
//   type = "text",
//   onChange,
//   value,
//   max,
// }: InputFieldProps) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showDateInput, setShowDateInput] = useState(false);

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);
//   const toggleDateVisibility = () => setShowDateInput(!showDateInput);

//   const isPassword = type === "password";
//   const isDate = type === "date";
//   const inputType = isPassword
//     ? showPassword
//       ? "text"
//       : "password"
//     : isDate
//       ? showDateInput
//         ? "date"
//         : "text"
//       : type;

//   return (
//     <div
//       className="relative mt-2 rounded-md shadow-sm"
//       onFocus={isDate ? toggleDateVisibility : undefined}
//       onBlur={isDate ? toggleDateVisibility : undefined}
//     >
//       <div className={`my-1 rounded-lg shadow-md ${icon ? "relative" : ""}`}>
//         {/* Icon Handling */}
//         {icon && (
//           <div className="absolute inset-y-0 left-0 flex items-center pl-4">
//             {icon === "ti-lock" ? (
//               showPassword ? (
//                 <i
//                   className="text-themeColorMain ti-unlock -mt-1 cursor-pointer text-lg"
//                   onClick={togglePasswordVisibility}
//                 ></i>
//               ) : (
//                 <LockIcon
//                   className="w-4 cursor-pointer"
//                   onClick={togglePasswordVisibility}
//                   aria-hidden="true"
//                 />
//               )
//             ) : (
//               <i className={`text-themeColorMain -mt-1 text-lg ${icon}`}></i>
//             )}
//           </div>
//         )}

//         {/* Input Field */}
//         <input
//           id={id}
//           name={id}
//           type={inputType}
//           className={`text-themeColorMain bg-compBg focus:ring-themeColorMain mobile:text-sm mobile:leading-6 block w-full rounded-lg border-2 bg-opacity-20 py-3 pl-12 placeholder-gray-300 ring-inset ring-white focus:ring-2 focus:ring-inset ${
//             icon ? (isPassword ? "py-1.5 pl-7 pr-12" : "py-1.5 pl-7") : "px-3"
//           }`}
//           placeholder={placeholder}
//           onChange={onChange}
//           autoComplete={
//             type === "password"
//               ? "current-password"
//               : type === "email"
//                 ? "username"
//                 : type
//           }
//           value={
//             typeof value === "boolean" ? (value ? "true" : "false") : value
//           }
//           max={max}
//           checked={type === "checkbox" ? (value as boolean) : undefined}
//         />

//         {/* Password Visibility Toggle */}
//         {isPassword && (
//           <div
//             className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4"
//             onClick={togglePasswordVisibility}
//           >
//             {showPassword ? (
//               <EyeIcon className="w-4" />
//             ) : (
//               <EyeActiveIcon className="w-4" />
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InputField;
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar, Eye, EyeOff } from "lucide-react";

import { cn } from "@acme/ui";

import { Button } from "../button";
import { Calendar as CalendarComponent } from "../calendar";
import { Input } from "../input";
import { Label } from "../label";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";

interface InputFieldProps {
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
