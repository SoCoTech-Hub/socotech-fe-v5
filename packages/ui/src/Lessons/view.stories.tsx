import type { Meta, StoryFn } from "@storybook/react";

import type { Material } from "./materials";
import type { Rating } from "./ratings";
import type { ViewProps } from "./view";
import ViewPage from "./view";

export default {
  title: "Components/ViewPage",
  component: ViewPage,
} as Meta;

const Template: StoryFn<ViewProps> = (args) => <ViewPage {...args} />;

const sampleMaterials: Material[] = [
  {
    id: "1",
    title: "React Documentation",
    description: "Official React documentation",
    icon: <span>📘</span>,
    url: "https://reactjs.org",
  },
  {
    id: "2",
    title: "TypeScript Handbook",
    description: "Comprehensive guide to TypeScript",
    icon: <span>📄</span>,
    url: "https://www.typescriptlang.org/docs/",
  },
];

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

export const DefaultViewPage = Template.bind({});
DefaultViewPage.args = {
  id: "lesson-1",
  subject: "Mathematics",
  title: "Introduction to Algebra",
  overview:
    "This lesson covers the basics of algebra, including variables, equations, and problem-solving techniques.",
  duration: "45 minutes",
  presenter: "John Doe",
  videoUrl: "https://example.com/lesson-video",
  hasQuiz: true,
  progress: 60,
  headerImageUrl: "https://via.placeholder.com/800x400",
  headerImageAlt: "Introduction to Algebra",
  materials: sampleMaterials,
  ratings: sampleRatings,
  onSubmit: (rating) => {
    console.log("Rating submitted: ", rating);
  },
};
