import { ChangeEvent, useEffect, useState } from "react";
import { Close } from "@/components/SvgIcons";

interface Option {
  [key: string]: any; // You can adjust this to define the exact structure of your options.
  name: string;
}

interface DefaultSelectNewProps {
  options: Option[];
  id: string;
  name: string;
  className?: string;
  valueSetter: (name: string, value: string | number) => void;
  placeholder?: string;
  isSearchField?: boolean;
  required?: boolean;
  value?: string | number;
  valueKey?: keyof Option;
}

export default function DefaultSelectNew({
  options = [],
  id,
  name,
  className = "my-1 rounded-lg shadow-md ",
  valueSetter,
  placeholder = "",
  isSearchField = false,
  required = true,
  value = "",
  valueKey = "id",
}: DefaultSelectNewProps) {
  const [autocompleteValue, setAutocompleteValue] = useState<{
    option: Option | null;
    inputValue: string;
  }>({
    option: null,
    inputValue: "",
  });
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!options?.length ?? !value) {
      setAutocompleteValue({ option: null, inputValue: "" });
    } else {
      const selectedOption = options?.find(
        (option) => option[valueKey] === value,
      );
      setAutocompleteValue({
        option: selectedOption ?? null,
        inputValue: selectedOption ? selectedOption.name : "",
      });
    }
  }, [options, value, valueKey]);

  const onSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setAutocompleteValue((prevState) => ({
      ...prevState,
      inputValue,
    }));
  };

  const filteredOptions = options?.filter((option) =>
    option.name
      .toLowerCase()
      .includes(autocompleteValue.inputValue.toLowerCase()),
  );

  const onSelectOption = (option: Option) => {
    setAutocompleteValue({
      option,
      inputValue: option.name,
    });
    if (isSearchField) {
      valueSetter(name, option[valueKey]);
    } else {
      valueSetter(option[valueKey]);
    }
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div
      className="relative mt-2 rounded-md shadow-md"
      onFocus={toggleDropdown}
    >
      <div className={className}>
        <input
          id={id}
          type="text"
          className="bg-compbg text-textColor w-full cursor-pointer rounded-lg border-2 border-white p-3"
          value={autocompleteValue.inputValue}
          onChange={onSearchInputChange}
          autoComplete="off"
          required={required}
          placeholder={placeholder}
        />
        <button
          className="cursor-pointer"
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={() =>
            setAutocompleteValue({
              option: null,
              inputValue: "",
            })
          }
        >
          {autocompleteValue.inputValue ? (
            <Close className="h-7 w-7" onClick={() => toggleDropdown()} />
          ) : (
            ""
          )}
        </button>
      </div>
      {showDropdown && (
        <div className="bg-themeColorSecondary absolute z-10 mt-2 h-64 w-full cursor-pointer overflow-y-scroll rounded-md border-2 text-white shadow-md">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option[valueKey]}
                className="hover:bg-themeColorMain cursor-pointer p-2 hover:text-white"
                onClick={() => onSelectOption(option)}
              >
                {option.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No Options</div>
          )}
        </div>
      )}
    </div>
  );
}
