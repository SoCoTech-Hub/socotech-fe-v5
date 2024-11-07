/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { MultiSelect } from "./";

// Setting up the Meta configuration for Storybook
const meta: Meta<typeof MultiSelect> = {
  title: "Data/MultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    placeholder: {
      control: "text",
      defaultValue: "Select items...",
      description: "Placeholder text for the MultiSelect input",
    },
    options: {
      control: { type: "object" },
      defaultValue: [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "cherry", label: "Cherry" },
        { value: "date", label: "Date" },
        { value: "fig", label: "Fig" },
        { value: "grape", label: "Grape" },
      ],
      description: "Array of options to display in the dropdown",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

// Default story for MultiSelect
export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<(typeof Option)[]>([]);
    return (
      <MultiSelect
        {...args}
        selected={selected}
        onChange={(newSelected) => setSelected(newSelected)}
      />
    );
  },
  args: {
    placeholder: "Select items...",
    options: [
      { value: "apple", label: "Apple" },
      { value: "banana", label: "Banana" },
      { value: "cherry", label: "Cherry" },
      { value: "date", label: "Date" },
      { value: "fig", label: "Fig" },
      { value: "grape", label: "Grape" },
    ],
  },
};

// Story to demonstrate the MultiSelect with pre-selected options
export const WithPreSelectedOptions: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<Option[]>([
      { value: "apple", text: "Apple" },
      { value: "banana", text: "Banana" },
    ]);

    return (
      <MultiSelect
        {...args}
        selected={selected}
        onChange={(newSelected) => setSelected(newSelected)}
      />
    );
  },
  args: {
    placeholder: "Select items...",
  },
};

// Story to show the component when no options are available
export const NoOptions: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<Option[]>([]);

    return (
      <MultiSelect
        {...args}
        options={[]}
        selected={selected}
        onChange={(newSelected) => setSelected(newSelected)}
      />
    );
  },
  args: {
    placeholder: "Select items...",
  },
};
