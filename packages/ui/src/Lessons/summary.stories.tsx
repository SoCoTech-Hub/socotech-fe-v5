import type { Meta, StoryFn } from "@storybook/react";

import type { LessonsRating, LessonsRatingSummaryProps } from "./summary";
import { LessonsRatingSummary } from "./summary";

export default {
  title: "Lesson/RatingSummary",
  component: LessonsRatingSummary,
} as Meta;

const Template: StoryFn<LessonsRatingSummaryProps> = (args) => (
  <LessonsRatingSummary {...args} />
);

const sampleRatings: LessonsRating[] = [
  {
    id: 1,
    userId: "user1",
    userName: "Jane Doe",
    userAvatar: "https://via.placeholder.com/40",
    rating: 5,
    comment: "Excellent material and presentation!",
    usefulCount: 3,
    timestamp: new Date(),
  },
  {
    id: 2,
    userId: "user2",
    userName: "John Smith",
    userAvatar: "https://via.placeholder.com/40",
    rating: 4,
    comment: "Very informative but a bit too fast-paced for me.",
    usefulCount: 2,
    timestamp: new Date(),
  },
  {
    id: 3,
    userId: "user3",
    userName: "Alice Johnson",
    userAvatar: "https://via.placeholder.com/40",
    rating: 3,
    comment: "It was okay, but I expected more details.",
    usefulCount: 1,
    timestamp: new Date(),
  },
];

export const DefaultSummary = Template.bind({});
DefaultSummary.args = {
  ratings: sampleRatings,
};
