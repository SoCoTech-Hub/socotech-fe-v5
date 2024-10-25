//USE InputMask

import React from "react";
import InputMask from "react-input-mask";

interface MaskedSerialProps {
  name: string;
  required?: boolean;
  value: string;
  setter: (value: string) => void;
}

const MaskedSerial: React.FC<MaskedSerialProps> = ({
  name,
  required = false,
  value,
  setter,
}) => {
  return (
    <InputMask
      className="text-themeColorMain focus:ring-themeColorMain mobile:text-sm mobile:leading-6 block w-full rounded-lg border-2 bg-white bg-opacity-20 p-3 placeholder-gray-500 shadow-md ring-inset ring-white focus:ring-2 focus:ring-inset"
      mask="* - **** - * - *** - *** - *** - *** - ***"
      onChange={(event) => setter(event.target.value)}
      placeholder={`Tablet Serial Number ${required ? "(Required)" : ""}`}
      name={name}
      id={name}
      value={value}
      required={required}
    />
  );
};

export default MaskedSerial;
