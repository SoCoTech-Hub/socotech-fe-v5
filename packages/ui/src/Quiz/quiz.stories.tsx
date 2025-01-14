/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryFn } from "@storybook/react";

import type { QuestionRendererProps } from "./questionRenderer";
import { QuestionRenderer } from "./questionRenderer";

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
} as Meta<QuestionRendererProps>;

export const Essay: StoryFn<QuestionRendererProps> = (args) => (
  <QuestionRenderer {...args} />
);
Essay.args = {
  question: {
    id: "1",
    type: "essay",
    question: "Describe your favorite hobby.",
    correctAnswer: "4",
  },
  answer: "",
};

export const FillInTheBlank: StoryFn<QuestionRendererProps> = (args) => (
  <QuestionRenderer {...args} />
);
FillInTheBlank.args = {
  question: {
    id: "2",
    type: "fillInTheBlank",
    question: "The capital of France is _____",
  },
  answer: "",
};

export const MultipleChoice: StoryFn<QuestionRendererProps> = (args) => (
  <QuestionRenderer {...args} />
);
MultipleChoice.args = {
  question: {
    id: "3",
    type: "multipleChoice",
    question: "Select all fruits.",
    options: ["Apple", "Carrot", "Banana", "Tomato"],
    correctAnswer: ["Apple", "Banana"],
  },
  answer: [],
};

export const SingleChoice: StoryFn<QuestionRendererProps> = (args) => (
  <QuestionRenderer {...args} />
);
SingleChoice.args = {
  question: {
    id: "4",
    type: "singleChoice",
    question: "What is 2 + 2?",
    options: ["3", "4", "5"],
    correctAnswer: "4",
  },
  answer: "",
};

export const SortingChoice: StoryFn<QuestionRendererProps> = (args) => (
  <QuestionRenderer {...args} />
);
SortingChoice.args = {
  question: {
    id: "5",
    type: "sortingChoice",
    question: "Sort these numbers in ascending order.",
    items: [
      { id: "1", content: "3" },
      { id: "2", content: "1" },
      { id: "3", content: "2" },
    ],
    correctOrder: ["2", "3", "1"],
    correctAnswer: ["1", "2", "3"], // Add correctAnswer property
  },
  answer: ["3", "1", "2"],
};

export const QuizMatrixSort: StoryFn<QuestionRendererProps> = (args) => (
  <QuestionRenderer {...args} />
);
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
