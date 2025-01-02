import type { Meta, StoryObj } from "@storybook/react";

import ReportSection from "./report"; // Adjust path if necessary

const sampleFilterOptions = {
  grades: [
    { id: "1", name: "Grade 1" },
    { id: "2", name: "Grade 2" },
  ],
  subjectCategories: [
    { id: "1", name: "Mathematics" },
    { id: "2", name: "Science" },
  ],
  subjects: [
    { id: "1", name: "Algebra" },
    { id: "2", name: "Biology" },
  ],
};

const sampleReport = {
  totalTimeSpent: 7200, // 2 hours
  lessonsCompleted: 5,
  lessonsInProgress: 2,
  lessons: [
    {
      id: "1",
      title: "Algebra Basics",
      status: "completed" as const,
      quizScore: 85,
      completionRate: 100,
      price: 0,
    },
    {
      id: "2",
      title: "Introduction to Biology",
      status: "in_progress" as const,
      quizScore: null,
      completionRate: 60,
      price: 10,
    },
    {
      id: "3",
      title: "Advanced Calculus",
      status: "not_started" as const,
      quizScore: null,
      completionRate: 0,
      price: 0,
    },
  ],
};

const meta: Meta<typeof ReportSection> = {
  title: "Reports/User Report",
  component: ReportSection,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ReportSection>;

export const Default: Story = {
  render: () => (
    <ReportSection filterOptions={sampleFilterOptions} report={sampleReport} />
  ),
};

export const Loading: Story = {
  render: () => <ReportSection filterOptions={sampleFilterOptions} />,
  parameters: {
    chromatic: { delay: 200 }, // Adds a delay for visual regression testing tools
  },
};
