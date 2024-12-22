import type { Meta, StoryObj } from "@storybook/react";

import QualificationPost from "./post";

const meta: Meta<typeof QualificationPost> = {
  title: "Qualification/Post",
  component: QualificationPost,
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: { type: "boolean" },
      description: "Loading state of the component.",
    },
    courseTitle: {
      control: { type: "text" },
      description: "Title of the qualification course.",
    },
    companyDescription: {
      control: { type: "text" },
      description: "Description of the company offering the qualification.",
    },
    timePosted: {
      control: { type: "text" },
      description: "Time when the qualification was posted.",
    },
    open: {
      control: { type: "text" },
      description: "Opening date of the qualification.",
    },
    close: {
      control: { type: "text" },
      description: "Closing date of the qualification.",
    },
    whoQualifies: {
      control: { type: "text" },
      description: "Information about who qualifies for the qualification.",
    },
    application: {
      control: { type: "text" },
      description: "Application information for the qualification.",
    },
    particulars: {
      control: { type: "text" },
      description: "Particular details of the qualification.",
    },
    notes: {
      control: { type: "text" },
      description: "Additional notes for the qualification.",
    },
    value: {
      control: { type: "text" },
      description: "Value of the qualification.",
    },
    iconSvg: {
      control: { type: "text" },
      description: "SVG icon for the qualification post.",
    },
    applicationFeatureImage: {
      control: { type: "text" },
      description: "URL of the feature image for the application.",
    },
    bgColor: {
      control: { type: "text" },
      description: "Background color for the icon area.",
    },
    numberOfApplicants: {
      control: { type: "text" },
      description: "Number of applicants for the qualification.",
    },
    qualificationId: {
      control: { type: "text" },
      description: "ID of the qualification.",
    },
    qualificationUrl: {
      control: { type: "text" },
      description: "URL of the qualification.",
    },
    profileId: {
      control: { type: "text" },
      description: "Profile ID for the user applying for the qualification.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof QualificationPost>;

export const Default: Story = {
  render: (args) => <QualificationPost {...args} />,
  args: {
    loading: false,
    courseTitle: "Engineering Qualification",
    companyDescription: "Tech Innovators",
    timePosted: "2024-11-01T12:00:00Z",
    open: "2024-11-01",
    close: "2024-12-01",
    whoQualifies:
      "<p>High school graduates with a passion for engineering.</p>",
    application: "<p>Submit your application online by the closing date.</p>",
    particulars: "<p>Full-time students only.</p>",
    notes: "<p>Ensure all documents are certified.</p>",
    value: "<p>Up to $10,000 per year.</p>",
    iconSvg: "",
    applicationFeatureImage: "https://via.placeholder.com/56",
    bgColor: "bg-yellow-500",
    numberOfApplicants: "10",
    qualificationId: "123",
    qualificationUrl: "https://qualification.example.com",
    profileId: "user_456",
  },
};

export const Loading: Story = {
  render: (args) => <QualificationPost {...args} />,
  args: {
    loading: true,
  },
};

export const WithIconSvg: Story = {
  render: (args) => <QualificationPost {...args} />,
  args: {
    loading: false,
    courseTitle: "Data Science Qualification",
    companyDescription: "Data Insights Group",
    open: "2024-11-10",
    close: "2025-01-10",
    whoQualifies: "<p>Graduates in data science-related fields.</p>",
    application: "<p>Complete the online application form.</p>",
    value: "<p>Up to $15,000 per year.</p>",
    iconSvg:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-star"><polygon points="5 11 19 11 12 2 9 22 12 17 15 22"></polygon></svg>',
    bgColor: "bg-green-500",
    numberOfApplicants: "5",
  },
};
