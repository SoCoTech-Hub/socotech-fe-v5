import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import CreateSupportForm from "./form";

export default {
  title: "Support/Form",
  component: CreateSupportForm,
} as Meta;

const Template: StoryFn = (args) => <CreateSupportForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: (title, description, location) =>
    alert(
      `Ticket Created:\nTitle: ${title}\nDescription: ${description}\nLocation: ${location}`,
    ),
};
