import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { Grade, ScrollTabsProps } from "./tabs";
import ScrollTabs from "./tabs";

export default {
  title: "Lesson/ScrollTabs",
  component: ScrollTabs,
} as Meta;

const Template: StoryFn<ScrollTabsProps> = (args) => <ScrollTabs {...args} />;

const grades: Grade[] = [
  {
    id: "grade-1",
    name: "Grade 1",
    subjects: [],
  },
  {
    id: "grade-2",
    name: "Grade 2",
    subjects: [],
  },
  {
    id: "grade-3",
    name: "Grade 3",
    subjects: [],
  },
];

export const DefaultScrollTabs = Template.bind({});
DefaultScrollTabs.args = {
  grades: grades,
  selectedGrade: "grade-1",
  setSelectedGrade: (gradeId) => {
    console.log("Selected Grade: ", gradeId);
  },
};
