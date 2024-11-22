import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { Rating } from "./ratings";
import RatingComponent from "./ratings";

export default {
  title: "Lesson/RatingComponent",
  component: RatingComponent,
} as Meta;

const Template: StoryFn<{ ratings: Rating[] }> = (args) => (
  <RatingComponent {...args.ratings} />
);

const sampleRatings: Rating[] = [
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
];

export const DefaultRatings = Template.bind({});
DefaultRatings.args = {
  ratings: sampleRatings,
};
