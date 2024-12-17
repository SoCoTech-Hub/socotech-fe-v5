import type { Meta, StoryObj } from "@storybook/react";

import BursaryPost from "./post";

const meta: Meta<typeof BursaryPost> = {
  title: "Bursary/Post",
  component: BursaryPost,
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: { type: "boolean" },
      description: "Loading state of the component.",
    },
    courseTitle: {
      control: { type: "text" },
      description: "Title of the bursary course.",
    },
    companyDescription: {
      control: { type: "text" },
      description: "Description of the company offering the bursary.",
    },
    timePosted: {
      control: { type: "text" },
      description: "Time when the bursary was posted.",
    },
    open: {
      control: { type: "text" },
      description: "Opening date of the bursary.",
    },
    close: {
      control: { type: "text" },
      description: "Closing date of the bursary.",
    },
    whoQualifies: {
      control: { type: "text" },
      description: "Information about who qualifies for the bursary.",
    },
    application: {
      control: { type: "text" },
      description: "Application information for the bursary.",
    },
    particulars: {
      control: { type: "text" },
      description: "Particular details of the bursary.",
    },
    notes: {
      control: { type: "text" },
      description: "Additional notes for the bursary.",
    },
    value: {
      control: { type: "text" },
      description: "Value of the bursary.",
    },
    iconSvg: {
      control: { type: "text" },
      description: "SVG icon for the bursary post.",
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
      description: "Number of applicants for the bursary.",
    },
    bursaryId: {
      control: { type: "text" },
      description: "ID of the bursary.",
    },
    bursaryUrl: {
      control: { type: "text" },
      description: "URL of the bursary.",
    },
    profileId: {
      control: { type: "text" },
      description: "Profile ID for the user applying for the bursary.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BursaryPost>;

export const Default: Story = {
  render: (args) => <BursaryPost {...args} />,
  args: {
    loading: false,
    courseTitle: "Engineering Bursary",
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
    bursaryId: "123",
    bursaryUrl: "https://bursary.example.com",
    profileId: "user_456",
  },
};

export const Loading: Story = {
  render: (args) => <BursaryPost {...args} />,
  args: {
    loading: true,
  },
};

export const WithIconSvg: Story = {
  render: (args) => <BursaryPost {...args} />,
  args: {
    loading: false,
    courseTitle: "Data Science Bursary",
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
