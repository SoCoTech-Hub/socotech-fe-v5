import type { Meta, StoryFn } from "@storybook/react";
import { useState } from "react";

import { DatePicker } from "./datePicker";

export default {
  title: "DatePicker/date",
  component: DatePicker,
} as Meta;

const Template: StoryFn = (args) => {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="max-w-md p-4">
      <DatePicker
        {...args}
        value={date}
        onChange={(selectedDate) => {
          setDate(selectedDate);
          console.log("Selected Date:", selectedDate);
        }}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Date of Birth",
  minimumAge: 18,
  maxAge: 80,
};
