import type { Meta, StoryFn } from "@storybook/react";

import type { SubjectCategory } from "./categories";
import SubjectCategories from "./categories";

export default {
  title: "LessonIntro/Categories",
  component: SubjectCategories,
} as Meta;

const sampleCategories: SubjectCategory[] = [
  {
    id: 1,
    title: "Mathematics",
    subjects: [],
  },
  {
    id: 2,
    title: "Science",
    subjects: [],
  },
];

const Template: StoryFn = (args) => <SubjectCategories {...args} />;

export const Default = Template.bind({});
Default.args = {
  categories: sampleCategories,
  selectedCategory: undefined,
  handleCategorySelect: (category) =>
    alert(`Selected Category: ${category.title}`),
};

export const WithSelectedCategory = Template.bind({});
WithSelectedCategory.args = {
  categories: sampleCategories,
  selectedCategory: sampleCategories[0],
  handleCategorySelect: (category) =>
    alert(`Selected Category: ${category.title}`),
};
