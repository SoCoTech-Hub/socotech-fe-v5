"use client";

import React, { useCallback, useEffect, useState } from "react";

import { Input } from "./input";
import { Label } from "./label";

type MaskType = "id" | "imei" | "mobile" | "serial";

interface InputMaskProps {
  type: MaskType;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const masks: Record<MaskType, string> = {
  id: "999-99-9999",
  imei: "99-999999-999999-9",
  mobile: "(999) 999-9999",
  serial: "AAAA-9999-AAAA-9999",
};

// Format the input value based on the mask provided
const formatValue = (value: string, mask: string) => {
  let maskedValue = "";
  let valueIndex = 0;

  for (let i = 0; i < mask.length; i++) {
    if (valueIndex >= value.length) break;

    if (mask[i] === "9") {
      if (/\d/.test(value[valueIndex] ?? "")) {
        maskedValue += value[valueIndex];
        valueIndex++;
      } else {
        valueIndex++;
        i--;
      }
    } else if (mask[i] === "A") {
      if (/[A-Za-z]/.test(value[valueIndex] ?? "")) {
        maskedValue += value[valueIndex]?.toUpperCase();
        valueIndex++;
      } else {
        valueIndex++;
        i--;
      }
    } else {
      maskedValue += mask[i];
    }
  }

  return maskedValue;
};

export default function InputMask({
  type,
  label,
  value,
  onChange,
}: InputMaskProps) {
  const [displayValue, setDisplayValue] = useState<string>("");

  // Update display value whenever the value or type changes
  useEffect(() => {
    setDisplayValue(formatValue(value, masks[type]));
  }, [value, type]);

  // Handle changes to the input field
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.replace(/[^A-Za-z0-9]/g, ""); // Strip out non-alphanumeric characters
      onChange(newValue);
    },
    [onChange],
  );

  return (
    <div className="space-y-2">
      <Label htmlFor={`input-${type}`}>{label}</Label>
      <Input
        id={`input-${type}`}
        type="text"
        value={displayValue || ""}
        onChange={handleChange}
        placeholder={masks[type] || ""}
        aria-describedby={`${type}-format`}
      />
      <p id={`${type}-format`} className="text-sm text-gray-500">
        Format: {masks[type]}
      </p>
    </div>
  );
}
