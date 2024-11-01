// import { useEffect, useState } from "react";
// import { Autocomplete, TextField } from "@mui/material";
// import { withStyles } from "@mui/styles";

// interface Option {
//   id: string | number;
//   name: string;
// }

// interface DefaultSelectProps {
//   options: Option[];
//   id: string;
//   name: string;
//   className?: string;
//   valueSetter: (name: string, value: string | number) => void;
//   placeholder?: string;
//   isSearchField?: boolean;
//   required?: boolean;
//   value?: string | number | null;
//   valueKey?: keyof Option;
// }

// const WhiteTextField = withStyles({
//   root: {
//     "& .MuiInput-underline:before": {
//       borderBottomColor: "#fff8",
//     },
//     "& .MuiInput-underline:hover:before": {
//       display: "none",
//     },
//     "& .MuiInput-underline:after": {
//       display: "none",
//     },
//   },
// })(TextField);

// export default function DefaultSelect({
//   options,
//   id,
//   name,
//   className = "font-bold style2-input w-full text-textColor bg-compBg",
//   valueSetter,
//   placeholder = "",
//   isSearchField = false,
//   required = true,
//   value = null,
//   valueKey = "id",
// }: DefaultSelectProps) {
//   const [autocompleteValue, setAutocompleteValue] = useState<Option | null>(
//     null,
//   );

//   useEffect(() => {
//     if (!options.length ?? value === null) {
//       setAutocompleteValue(null);
//     }

//     if (options.length && value) {
//       const selectedOption = options.find(
//         (option) => parseInt(option.id as string) === parseInt(value as string),
//       );
//       setAutocompleteValue(selectedOption ? selectedOption : null);
//     }
//   }, [options.length, value]);

//   const onChange = (_: any, newValue: Option | null) => {
//     if (newValue) {
//       if (isSearchField) {
//         valueSetter(name, newValue[valueKey]);
//       } else {
//         valueSetter(newValue[valueKey]);
//       }
//       setAutocompleteValue(newValue);
//     } else {
//       if (isSearchField) {
//         valueSetter(name, "");
//       } else {
//         valueSetter("");
//       }
//       setAutocompleteValue(null);
//     }
//   };

//   return (
//     <div className="form-group text-textColor bg-compBg mb-2 mt-2 font-bold">
//       <Autocomplete
//         value={autocompleteValue}
//         className={className}
//         onChange={onChange}
//         options={options}
//         getOptionLabel={(option: Option) => option.name}
//         autoComplete={false}
//         disabled={false ?? !options.length}
//         style={{ color: "#fff" }}
//         renderInput={(params) => (
//           <div className="pt-1.5">
//             <WhiteTextField
//               className="px-2"
//               variant="standard"
//               {...params}
//               inputProps={{
//                 ...params.inputProps,
//                 name,
//                 id,
//                 required,
//                 placeholder,
//                 autoComplete: "off",
//                 style: { color: "#fff" },
//               }}
//             />
//           </div>
//         )}
//       />
//     </div>
//   );
// }
import React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@acme/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";

export interface Option {
  value: string;
  label: string;
}

interface DefaultSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function DefaultSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  className,
  disabled = false,
}: DefaultSelectProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
