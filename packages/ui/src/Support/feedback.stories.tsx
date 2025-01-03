import type { Meta, StoryFn } from "@storybook/react";

import FeedbackForm from "./feedback";

export default {
  title: "Support/FeedbackForm",
  component: FeedbackForm,
} as Meta;

const Template: StoryFn<{ onBack: () => void }> = (args) => (
  <FeedbackForm {...args} />
);

export const DefaultFeedbackForm = Template.bind({});
DefaultFeedbackForm.args = {
  onBack: () => {
    console.log("Back button clicked");
  },
};
