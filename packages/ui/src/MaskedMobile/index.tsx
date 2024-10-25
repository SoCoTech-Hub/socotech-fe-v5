//USE InputMask

import React from "react";
import InputField from "@/components/InputField";

interface MaskedMobileProps {
  required?: boolean;
  value: string;
  setter: (value: string) => void;
  placeholder: string;
}

const MaskedMobile: React.FC<MaskedMobileProps> = ({
  required = false,
  value,
  setter,
  placeholder,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;

    // Remove all non-digit characters
    let numericValue = inputValue.replace(/\D/g, "");
    numericValue = numericValue.slice(0, 10);

    if (numericValue.length <= 10) {
      if (numericValue.length > 6) {
        numericValue = `${numericValue.slice(0, 3)}-${numericValue.slice(
          3,
          6,
        )}-${numericValue.slice(6)}`;
      } else if (numericValue.length > 3) {
        numericValue = `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
      }
    }
    setter(numericValue);
  };

  return (
    <InputField
      placeholder={`${placeholder} ${required ? "(Required)" : ""}`}
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
};

export default MaskedMobile;
