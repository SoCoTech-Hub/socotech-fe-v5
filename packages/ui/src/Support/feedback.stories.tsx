import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import FeedbackForm from "./feedback";

export default {
  title: "Support/Feedback",
  component: FeedbackForm,
} as Meta;

const Template: StoryFn = (args) => <FeedbackForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onBack: () => alert("Navigated back"),
};
