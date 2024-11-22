import type { Meta, StoryFn } from "@storybook/react";
import React, { useState } from "react";

import { DateTimePicker } from "./dateTimePicker";

export default {
  title: "DatePicker/DateTime",
  component: DateTimePicker,
} as Meta;

const Template: StoryFn = (args) => {
  const [value, setValue] = useState<Date | undefined>();

  return (
    <div className="max-w-md p-4">
      <DateTimePicker
        {...args}
        value={value}
        onChange={(selectedDate) => {
          setValue(selectedDate);
          console.log("Selected Date and Time:", selectedDate);
        }}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Event Date and Time",
  datePlaceholder: "Pick a date",
  timePlaceholder: "Pick a time",
};
