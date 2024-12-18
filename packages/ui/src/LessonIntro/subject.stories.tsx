import type { Meta, StoryFn } from "@storybook/react";

import type { SubjectCategory } from "./categories";
import Subjects from "./subjects";

export default {
  title: "LessonIntro/Subjects",
  component: Subjects,
} as Meta;

const sampleCategory: SubjectCategory = {
  id: 1,
  title: "Mathematics",
  subjects: [
    {
      id: "1",
      title: "Algebra",
      lessons: [],
    },
    {
      id: "2",
      title: "Geometry",
      lessons: [],
    },
  ],
};

const Template: StoryFn = (args) => (
  <Subjects
    selectedCategory={sampleCategory}
    handleBack={() => alert("Back to Categories")}
    handleSubjectSelect={(subject) =>
      alert(`Selected Subject: ${subject.title}`)
    }
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  selectedCategory: sampleCategory,
  handleBack: () => alert("Back to Categories"),
  handleSubjectSelect: (subject: { title: any }) =>
    alert(`Selected Subject: ${subject.title}`),
};
