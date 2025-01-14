import type { Meta, StoryFn } from "@storybook/react";

import type { Grade } from "./tabs";
import { Lessons } from "./select";

export default {
  title: "Lesson/Lessons",
  component: Lessons,
} as Meta;

const Template: StoryFn = (args) => <Lessons grades={grades} {...args} />;

const grades: Grade[] = [
  {
    id: "grade-1",
    name: "Grade 1",
    subjects: [
      {
        id: 1,
        name: "Mathematics",
        imageUrl: "/placeholder.svg?height=200&width=300&text=Mathematics",
        lessons: [
          {
            id: 1,
            title: "Numbers 1-10",
            imageUrl: "/placeholder.svg?height=200&width=300&text=Numbers+1-10",
          },
          {
            id: 2,
            title: "Basic Addition",
            imageUrl:
              "/placeholder.svg?height=200&width=300&text=Basic+Addition",
          },
        ],
      },
      {
        id: 2,
        name: "English",
        imageUrl: "/placeholder.svg?height=200&width=300&text=English",
        lessons: [
          {
            id: 1,
            title: "Alphabet",
            imageUrl: "/placeholder.svg?height=200&width=300&text=Alphabet",
          },
          {
            id: 2,
            title: "Simple Words",
            imageUrl: "/placeholder.svg?height=200&width=300&text=Simple+Words",
          },
        ],
      },
    ],
  },
  {
    id: "grade-2",
    name: "Grade 2",
    subjects: [
      {
        id: 3,
        name: "Mathematics",
        imageUrl: "/placeholder.svg?height=200&width=300&text=Mathematics",
        lessons: [
          {
            id: 1,
            title: "Multiplication Tables",
            imageUrl:
              "/placeholder.svg?height=200&width=300&text=Multiplication+Tables",
          },
          {
            id: 2,
            title: "Basic Division",
            imageUrl:
              "/placeholder.svg?height=200&width=300&text=Basic+Division",
          },
        ],
      },
    ],
  },
];

export const DefaultLessons = Template.bind({});
