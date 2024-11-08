import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import ReportSection from "./section";

const meta: Meta<typeof ReportSection> = {
  title: "Components/ReportSection",
  component: ReportSection,
  parameters: {
    layout: "centered",
  },
  args: {
    // Default args can be set here if needed
  },
};

export default meta;

type Story = StoryObj<typeof ReportSection>;

// Mock data for the stories
const mockReport = {
  totalTimeSpent: 7200,
  lessonsCompleted: 10,
  lessonsInProgress: 3,
  lessons: [
    {
      id: "1",
      title: "Introduction to React",
      status: "completed",
      quizScore: 90,
      completionRate: 100,
      paid: false,
    },
    {
      id: "2",
      title: "State Management",
      status: "completed",
      quizScore: 85,
      completionRate: 100,
      paid: true,
    },
    {
      id: "3",
      title: "Hooks in Depth",
      status: "in_progress",
      quizScore: null,
      completionRate: 60,
      paid: false,
    },
    {
      id: "4",
      title: "React Router",
      status: "completed",
      quizScore: 95,
      completionRate: 100,
      paid: true,
    },
    {
      id: "5",
      title: "Redux Fundamentals",
      status: "in_progress",
      quizScore: null,
      completionRate: 30,
      paid: false,
    },
  ],
};

const Template: Story = (args) => <ReportSection {...args} />;

export const Loading: Story = Template.bind({});
Loading.args = {
  loading: true,
};

export const Default: Story = Template.bind({});
Default.args = {
  report: mockReport,
  loading: false,
};

export const WithFilters: Story = Template.bind({});
WithFilters.args = {
  report: mockReport,
  loading: false,
  // Simulate filter selection
  selectedGrade: "Grade 2",
  selectedCategory: "Science",
  selectedSubject: "Biology",
};

export const WithPaidLessons: Story = Template.bind({});
WithPaidLessons.args = {
  report: {
    ...mockReport,
    lessons: [
      ...mockReport.lessons,
      {
        id: "6",
        title: "Advanced React Patterns",
        status: "not_started",
        quizScore: null,
        completionRate: 0,
        paid: true,
      },
    ],
  },
  loading: false,
};
