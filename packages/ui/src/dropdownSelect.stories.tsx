import type { Meta, StoryFn } from "@storybook/react";
import React, { useState } from "react";

import type { Option } from "./dropdownSelect";
import { DropdownSelect } from "./dropdownSelect";

export default {
  title: "DropdownSelect",
  component: DropdownSelect,
} as Meta;

const options: Option[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

const Template: StoryFn = (args) => {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div>
      <DropdownSelect
        {...args}
        onChange={(value) => {
          setSelectedValue(value);
          console.log("Selected Value:", value);
        }}
      />
      <p className="mt-4">
        <strong>Selected:</strong> {selectedValue || "None"}
      </p>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Fruits",
  options,
  placeholder: "Select a fruit",
};
