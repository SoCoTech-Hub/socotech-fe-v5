import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { InputFieldProps } from "./";
import { InputField } from "./";

export default {
  title: "InputField",
  component: InputField,
} as Meta;

const Template: StoryFn<InputFieldProps> = (args) => <InputField {...args} />;

export const TextInputField = Template.bind({});
TextInputField.args = {
  type: "text",
  label: "Username",
  placeholder: "Enter your username",
  value: "",
  onChange: (value) => {
    console.log("Text input value: ", value);
  },
};

export const PasswordInputField = Template.bind({});
PasswordInputField.args = {
  type: "password",
  label: "Password",
  placeholder: "Enter your password",
  value: "",
  onChange: (value) => {
    console.log("Password input value: ", value);
  },
};

export const DateInputField = Template.bind({});
DateInputField.args = {
  type: "date",
  label: "Date of Birth",
  value: new Date(),
  onChange: (value) => {
    console.log("Date input value: ", value);
  },
};
