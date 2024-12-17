import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import type { Option } from "./";
import { SearchableSelect } from "./";

export default {
  title: "SearchableSelect/Index",
  component: SearchableSelect,
} as Meta;

const options: Option[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

const Template: StoryFn = (args) => {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="max-w-sm p-4">
      <SearchableSelect
        {...args}
        options={options}
        value={selected}
        onChange={(value) => {
          setSelected(value);
          console.log("Selected Value:", value);
        }}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: "Select a fruit",
  label: "Fruit",
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: "Select a fruit",
  label: "Fruit",
  disabled: true,
};
