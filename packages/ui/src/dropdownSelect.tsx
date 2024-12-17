import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export interface Option {
  value: string;
  label: string;
}

interface DropdownSelectProps {
  label: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export function DropdownSelect({
  label,
  options,
  onChange,
  placeholder = "Select an option",
}: DropdownSelectProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={label}>{label}</Label>
      <Select onValueChange={onChange}>
        <SelectTrigger id={label}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white">
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
