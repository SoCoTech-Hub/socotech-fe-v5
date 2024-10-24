import { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { withStyles } from "@mui/styles";

interface Option {
  id: string | number;
  name: string;
}

interface DefaultSelectProps {
  options: Option[];
  id: string;
  name: string;
  className?: string;
  valueSetter: (name: string, value: string | number) => void;
  placeholder?: string;
  isSearchField?: boolean;
  required?: boolean;
  value?: string | number | null;
  valueKey?: keyof Option;
}

const WhiteTextField = withStyles({
  root: {
    "& .MuiInput-underline:before": {
      borderBottomColor: "#fff8",
    },
    "& .MuiInput-underline:hover:before": {
      display: "none",
    },
    "& .MuiInput-underline:after": {
      display: "none",
    },
  },
})(TextField);

export default function DefaultSelect({
  options,
  id,
  name,
  className = "font-bold style2-input w-full text-textColor bg-compBg",
  valueSetter,
  placeholder = "",
  isSearchField = false,
  required = true,
  value = null,
  valueKey = "id",
}: DefaultSelectProps) {
  const [autocompleteValue, setAutocompleteValue] = useState<Option | null>(null);

  useEffect(() => {
    if (!options.length || value === null) {
      setAutocompleteValue(null);
    }

    if (options.length && value) {
      const selectedOption = options.find((option) => parseInt(option.id as string) === parseInt(value as string));
      setAutocompleteValue(selectedOption ? selectedOption : null);
    }
  }, [options.length, value]);

  const onChange = (_: any, newValue: Option | null) => {
    if (newValue) {
      if (isSearchField) {
        valueSetter(name, newValue[valueKey]);
      } else {
        valueSetter(newValue[valueKey]);
      }
      setAutocompleteValue(newValue);
    } else {
      if (isSearchField) {
        valueSetter(name, "");
      } else {
        valueSetter("");
      }
      setAutocompleteValue(null);
    }
  };

  return (
    <div className="mt-2 mb-2 font-bold form-group text-textColor bg-compBg">
      <Autocomplete
        value={autocompleteValue}
        className={className}
        onChange={onChange}
        options={options}
        getOptionLabel={(option: Option) => option.name}
        autoComplete={false}
        disabled={false || !options.length}
        style={{ color: "#fff" }}
        renderInput={(params) => (
          <div className="pt-1.5">
            <WhiteTextField
              className="px-2"
              variant="standard"
              {...params}
              inputProps={{
                ...params.inputProps,
                name,
                id,
                required,
                placeholder,
                autoComplete: "off",
                style: { color: "#fff" },
              }}
            />
          </div>
        )}
      />
    </div>
  );
}
