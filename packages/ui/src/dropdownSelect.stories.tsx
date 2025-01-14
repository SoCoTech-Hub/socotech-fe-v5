import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import type { DropdownSelectOption } from "./dropdownSelect";
import { DropdownSelect } from "./dropdownSelect";

export default {
  title: "DropdownSelect",
  component: DropdownSelect,
  parameters: {
    docs: {
      description: {
        component:
          "A customizable dropdown select component that allows users to select a single option from a list. Useful for forms and filters.",
      },
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Label for the dropdown select.",
      defaultValue: "Select an option",
    },
    options: {
      control: "object",
      description: "Array of options for the dropdown.",
    },
    onChange: {
      action: "onChange",
      description: "Callback triggered when an option is selected.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text displayed before a selection is made.",
      defaultValue: "Select an option",
    },
  },
} as Meta;

const options: DropdownSelectOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

const Template: StoryFn = (args) => {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div className="max-w-sm">
      <DropdownSelect
        {...args}
        label="Select"
        options={options}
        onChange={(value) => {
          setSelectedValue(value);
          args.onChange(value); // Trigger the Storybook action
        }}
      />
      <p className="mt-4 text-sm">
        <strong>Selected Value:</strong> {selectedValue || "None"}
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

export const CustomOptions = Template.bind({});
CustomOptions.args = {
  label: "Animals",
  options: [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "rabbit", label: "Rabbit" },
  ],
  placeholder: "Select an animal",
};
