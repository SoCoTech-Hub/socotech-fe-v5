// import { ChangeEvent, useState } from "react";
// import Alert from "@/components/Alert";

// interface DatePickFieldProps {
//   id: string;
//   placeholder?: string;
//   onChange: (event: { target: { value: string; name: string } }) => void;
//   value?: string;
//   required?: boolean;
// }

// const DatePickField: React.FC<DatePickFieldProps> = ({
//   id,
//   placeholder = "Input Text Here",
//   onChange,
//   value = "",
//   required = false,
// }) => {
//   const [showInput, setShowInput] = useState(false);
//   const [year, setYear] = useState(
//     value ? new Date(value).getFullYear().toString() : "",
//   );
//   const [month, setMonth] = useState(
//     value ? (new Date(value).getMonth() + 1).toString() : "",
//   );
//   const [day, setDay] = useState(
//     value ? new Date(value).getDate().toString() : "",
//   );
//   const [error, setError] = useState("");

//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
//     const newYear = event.target.value;
//     setYear(newYear);
//     updateDate(newYear, month, day);
//   };

//   const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
//     const monthIndex = monthNames.indexOf(event.target.value) + 1;
//     setMonth(monthIndex.toString());
//     updateDate(year, monthIndex.toString(), day);
//   };

//   const handleDayChange = (event: ChangeEvent<HTMLSelectElement>) => {
//     const newDay = event.target.value;
//     setDay(newDay);
//     updateDate(year, month, newDay);
//   };

//   const updateDate = (year: string, month: string, day: string) => {
//     if (!year ?? !month ?? !day) {
//       setError("Please complete the date");
//       return;
//     }
//     const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
//     if (isValidDate(formattedDate)) {
//       setError("");
//       onChange({ target: { value: formattedDate, name: id } });
//     } else {
//       setError("Please enter a valid date");
//     }
//   };

//   const isValidDate = (dateString: string) => {
//     const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
//     if (!dateString.match(dateRegex)) return false;
//     const date = new Date(dateString);
//     return !isNaN(date.getTime());
//   };

//   const yearOptions = Array.from(
//     { length: 80 },
//     (_, i) => new Date().getFullYear() - i,
//   );
//   const monthOptions = monthNames;
//   const dayOptions = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

//   const toggleInputVisibility = () => {
//     setShowInput(!showInput);
//   };

//   return (
//     <div className="relative my-3 rounded-md shadow-md">
//       <div className="rounded-lg shadow-md">
//         {showInput ? (
//           <div className="flex flex-row">
//             <select
//               value={year}
//               onChange={handleYearChange}
//               className="placeholder-compBg bg-compBg text-textColor focus:ring-themeColorMain mobile:text-sm mobile:leading-6 mr-2 block w-1/3 rounded-lg border-2 border-white bg-opacity-20 px-3 py-3 pl-12 ring-inset ring-white focus:ring-2 focus:ring-inset"
//             >
//               <option value="" disabled className="bg-compBg">
//                 Year
//               </option>
//               {yearOptions.map((y, index) => (
//                 <option key={`${y}-${index}`} value={y} className="bg-compBg">
//                   {y}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={month ? monthNames[parseInt(month) - 1] : ""}
//               onChange={handleMonthChange}
//               className="placeholder-compBg bg-compBg text-textColor focus:ring-themeColorMain mobile:text-sm mobile:leading-6 mr-2 block w-1/3 rounded-lg border-2 border-white bg-opacity-20 px-3 py-3 pl-12 ring-inset ring-white focus:ring-2 focus:ring-inset"
//             >
//               <option value="" disabled className="bg-compBg">
//                 Month
//               </option>
//               {monthOptions.map((m, index) => (
//                 <option key={`${m}-${index}`} value={m} className="bg-compBg">
//                   {m}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={day}
//               onChange={handleDayChange}
//               className="bg-compBg text-textColor focus:ring-themeColorMain mobile:text-sm mobile:leading-6 block w-1/3 rounded-lg border-2 border-white bg-opacity-20 px-3 py-3 pl-12 placeholder-gray-300 ring-inset ring-white focus:ring-2 focus:ring-inset"
//             >
//               <option value="" disabled className="bg-compBg">
//                 Day
//               </option>
//               {dayOptions.map((d, index) => (
//                 <option key={`${d}-${index}`} value={d} className="bg-compBg">
//                   {d}
//                 </option>
//               ))}
//             </select>
//           </div>
//         ) : (
//           <input
//             type="text"
//             onFocus={toggleInputVisibility}
//             onBlur={toggleInputVisibility}
//             required={required}
//             className="bg-compBg text-textColor focus:ring-themeColorMain mobile:text-sm mobile:leading-6 block w-full rounded-lg border-2 border-white bg-opacity-20 px-3 py-3 pl-12 placeholder-gray-300 ring-inset ring-white focus:ring-2 focus:ring-inset"
//             placeholder={`${placeholder} ${required && !value ? "(Required)" : ""} ${value ? value : ""}`}
//           />
//         )}

//         <Alert error={error} />
//       </div>
//     </div>
//   );
// };

// export default DatePickField;
"use client";

import React from "react";
import { Button } from "@acme/ui/button";
import { Calendar } from "@acme/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@acme/ui/popover";
import { cn } from "@acme/ui";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface DatePickFieldProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  label?: string;
  className?: string;
}

export function DatePickField({
  date,
  onDateChange,
  label = "Pick a date",
  className,
}: DatePickFieldProps) {
  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{label}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}