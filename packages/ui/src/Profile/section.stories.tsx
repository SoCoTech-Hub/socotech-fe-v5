import type { Meta, StoryObj } from "@storybook/react";

import Section from "./section";

const meta: Meta<typeof Section> = {
  title: "Profile/Section",
  component: Section,
  parameters: {
    layout: "centered",
  },
};

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

const sampleDropdowns = {
  genders: [
    { id: "1", value: "male", section: "gender", name: "Male" },
    { id: "2", value: "female", section: "gender", name: "Female" },
  ],
  provinces: [
    { id: "1", value: "gauteng", section: "province", name: "Gauteng" },
    {
      id: "2",
      value: "western-cape",
      section: "province",
      name: "Western Cape",
    },
  ],
  schools: [
    { id: "1", value: "school1", section: "school", name: "School 1" },
    { id: "2", value: "school2", section: "school", name: "School 2" },
  ],
  districts: [
    { id: "1", value: "district1", section: "district", name: "District 1" },
    { id: "2", value: "district2", section: "district", name: "District 2" },
  ],
  titles: [
    { id: "1", value: "mr", section: "title", name: "Mr." },
    { id: "2", value: "ms", section: "title", name: "Ms." },
  ],
  relationships: [
    { id: "1", value: "father", section: "relation", name: "Father" },
    { id: "2", value: "mother", section: "relation", name: "Mother" },
  ],
};

const sampleUserInfo = {
  personalInfo: {
    idNumber: "",
    dateOfBirth: "",
    gender: "",
    province: "",
    school: "",
    district: "",
  },
  deviceInfo: {
    serialNumber: "",
    imei: "",
  },
  parentInfo: {
    name: "",
    surname: "",
    mobileNumber: "",
    workNumber: "",
    idNumber: "",
    title: "",
    relation: "",
  },
  contactInfo: {
    addressLine1: "",
    addressLine2: "",
    town: "",
    mobileNumber: "",
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
  render: () => (
    <Section
      ReportSectionProps={{
        filterOptions: sampleFilterOptions,
        report: sampleReport,
      }}
      aboutInfo={{
        profile: {
          id: "123",
          firstName: "John",
          surname: "Doe",
          email: "john.doe@example.com",
          bio: "Software Engineer with a passion for building scalable applications.",
          location: "San Francisco, CA",
        },
      }}
      dropdowns={sampleDropdowns}
      initialUserInfo={sampleUserInfo}
    />
  ),
};
