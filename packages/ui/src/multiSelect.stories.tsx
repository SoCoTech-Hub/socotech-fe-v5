import type { Meta, StoryFn } from "@storybook/react";
import  { useState } from "react";

import { MultiSelect, MultiSelectProps } from "./multiSelect";

export default {
  title: "Components/MultiSelect",
  component: MultiSelect,
} as Meta;

const Template: StoryFn<MultiSelectProps> = (args) => {
  const [selected, setSelected] = useState(args.selected || []);
  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <MultiSelect
        {...args}
        selected={selected}
        onChange={(newSelected) => {
          setSelected(newSelected);
          args.onChange(newSelected);
        }}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  options: [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
    { value: "option5", label: "Option 5" },
  ],
  selected: [{ value: "option1", label: "Option 1" }],
  placeholder: "Select items...",
  onChange: (selected) => console.log("Selected options:", selected),
};
