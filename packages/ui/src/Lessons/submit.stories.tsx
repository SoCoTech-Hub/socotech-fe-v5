import type { Meta, StoryFn } from "@storybook/react";

import type { LessonRatingSubmissionProps } from "./submit";
import { LessonRatingSubmission } from "./submit";

export default {
  title: "Lesson/RatingSubmission",
  component: LessonRatingSubmission,
} as Meta;

const Template: StoryFn<LessonRatingSubmissionProps> = (args) => (
  <LessonRatingSubmission {...args} />
);

export const DefaultSubmission = Template.bind({});
DefaultSubmission.args = {
  onSubmit: (rating) => {
    console.log("Rating submitted: ", rating);
  },
};
