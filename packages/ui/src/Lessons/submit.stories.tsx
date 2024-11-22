import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { RatingSubmissionProps } from "./submit";
import RatingSubmission from "./submit";

export default {
  title: "Lesson/RatingSubmission",
  component: RatingSubmission,
} as Meta;

const Template: StoryFn<RatingSubmissionProps> = (args) => (
  <RatingSubmission {...args} />
);

export const DefaultSubmission = Template.bind({});
DefaultSubmission.args = {
  onSubmit: (rating) => {
    console.log("Rating submitted: ", rating);
  },
};
