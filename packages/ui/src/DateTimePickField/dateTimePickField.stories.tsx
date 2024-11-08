/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import DateTimePickField from "./";

const meta: Meta<typeof DateTimePickField> = {
  title: "Components/DateTimePickField",
  component: DateTimePickField,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "date" },
      description: "The selected date and time value.",
    },
    onChange: {
      action: "onChange",
      description: "Callback function to handle date and time changes.",
    },
    label: {
      control: { type: "text" },
      description: "Label text displayed when no date is selected.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateTimePickField>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return <DateTimePickField {...args} value={date} onChange={setDate} />;
  },
  args: {
    label: "Pick date and time",
  },
};

export const PreselectedDate: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <DateTimePickField {...args} value={date} onChange={setDate} />;
  },
  args: {
    label: "Pick date and time",
  },
};
