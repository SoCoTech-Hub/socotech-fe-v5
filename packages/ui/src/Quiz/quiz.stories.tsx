/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta } from "@storybook/react";

import QuestionRenderer from "./questionRenderer";

export default {
  title: "Quiz/QuestionRenderer",
  component: QuestionRenderer,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    question: { control: "object" },
    onAnswer: { action: "answered" },
    answer: { control: "text" },
  },
} as Meta;

const Template = (args: any) => <QuestionRenderer {...args} />;

export const Essay = Template.bind({});
Essay.args = {
  question: {
    id: "1",
    type: "essay",
    question: "Describe your favorite hobby.",
  },
  answer: "",
};

export const FillInTheBlank = Template.bind({});
FillInTheBlank.args = {
  question: {
    id: "2",
    type: "fillInTheBlank",
    question: "The capital of France is _____",
  },
  answer: "",
};

export const MultipleChoice = Template.bind({});
MultipleChoice.args = {
  question: {
    id: "3",
    type: "multipleChoice",
    question: "Select all fruits.",
    options: ["Apple", "Carrot", "Banana", "Tomato"],
  },
  answer: [],
};

export const SingleChoice = Template.bind({});
SingleChoice.args = {
  question: {
    id: "4",
    type: "singleChoice",
    question: "What is 2 + 2?",
    options: ["3", "4", "5"],
  },
  answer: "",
};

export const SortingChoice = Template.bind({});
SortingChoice.args = {
  question: {
    id: "5",
    type: "sortingChoice",
    question: "Sort these numbers in ascending order.",
    options: ["3", "1", "2"],
  },
  answer: ["3", "1", "2"],
};

export const QuizMatrixSort = Template.bind({});
QuizMatrixSort.args = {
  question: {
    id: "6",
    type: "matrixSort",
    question: "Sort items into the correct categories.",
    matrixData: {
      Fruits: ["Apple", "Banana"],
      Vegetables: ["Carrot", "Lettuce"],
    },
  },
  answer: {
    Fruits: [],
    Vegetables: [],
  },
};
