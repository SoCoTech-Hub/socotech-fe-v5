import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { ApplicationsPost } from "./post";

const meta: Meta<typeof ApplicationsPost> = {
  title: "Applications/Post",
  component: ApplicationsPost,
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: { type: "boolean" },
      description: "Loading state of the component.",
    },
    courseTitle: {
      control: { type: "text" },
      description: "Title of the course.",
    },
    companyDescription: {
      control: { type: "text" },
      description: "Description of the company.",
    },
    timePosted: {
      control: { type: "text" },
      description: "Time when the post was created.",
    },
    numberOfApplicants: {
      control: { type: "text" },
      description: "Number of applicants.",
    },
    positionTitle: {
      control: { type: "text" },
      description: "Title of the position.",
    },
    fieldDescription: {
      control: { type: "text" },
      description: "Description of the field.",
    },
    compareDescription: {
      control: { type: "text" },
      description: "Comparison description.",
    },
    topDescription: {
      control: { type: "text" },
      description: "Top description for the application.",
    },
    responsibilitiesDescription: {
      control: { type: "text" },
      description: "Responsibilities of the position.",
    },
    requirementsDescription: {
      control: { type: "text" },
      description: "Requirements for the position.",
    },
    applicationFeatureImage: {
      control: { type: "text" },
      description: "URL of the feature image for the application.",
    },
    bgColor: {
      control: { type: "color" },
      description: "Background color for the icon area.",
    },
    svgIcon: {
      control: { type: "text" },
      description: "SVG icon for the application.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ApplicationsPost>;

export const Default: Story = {
  render: (args) => <ApplicationsPost {...args} />,
  args: {
    loading: false,
    courseTitle: "Software Developer Internship",
    companyDescription: "Tech Company Inc.",
    timePosted: "2023-10-01T12:00:00Z",
    numberOfApplicants: "5",
    positionTitle: "Intern",
    fieldDescription: "Software Engineering",
    compareDescription: "Competitive pay and learning opportunities",
    topDescription:
      "<p>This is a great opportunity to learn and grow in a tech company.</p>",
    responsibilitiesDescription:
      "<ul><li>Develop features</li><li>Work with team</li></ul>",
    requirementsDescription:
      "<ul><li>Basic knowledge of React</li><li>Enthusiasm to learn</li></ul>",
    applicationFeatureImage: "/path/to/image.jpg",
    bgColor: "#f0f0f0",
    svgIcon: "<svg></svg>",
  },
};

export const Loading: Story = {
  render: (args) => <ApplicationsPost {...args} />,
  args: {
    loading: true,
  },
};

export const WithSVGIcon: Story = {
  render: (args) => <ApplicationsPost {...args} />,
  args: {
    loading: false,
    courseTitle: "Advanced TypeScript",
    companyDescription: "Tech Solutions",
    timePosted: "2023-09-15T10:00:00Z",
    numberOfApplicants: "3",
    positionTitle: "Senior Developer",
    fieldDescription: "TypeScript Development",
    compareDescription: "Great opportunities for career growth",
    topDescription: "<p>Advanced TypeScript course with hands-on projects.</p>",
    responsibilitiesDescription:
      "<ul><li>Lead development projects</li><li>Mentor junior developers</li></ul>",
    requirementsDescription:
      "<ul><li>Expert knowledge of TypeScript</li><li>5+ years of experience</li></ul>",
    svgIcon:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-star"><polygon points="5 11 19 11 12 2 9 22 12 17 15 22"></polygon></svg>',
  },
};

export const NoImageOrIcon: Story = {
  render: (args) => <ApplicationsPost {...args} />,
  args: {
    loading: false,
    courseTitle: "UI/UX Design Principles",
    companyDescription: "Creative Agency",
    timePosted: "2023-08-10T08:30:00Z",
    numberOfApplicants: "8",
    positionTitle: "Designer",
    fieldDescription: "UI/UX Design",
    compareDescription: "Focus on user-centric design",
    topDescription: "<p>Learn the core principles of great UI/UX design.</p>",
    responsibilitiesDescription:
      "<ul><li>Design user interfaces</li><li>Conduct user research</li></ul>",
    requirementsDescription:
      "<ul><li>Experience with Figma</li><li>Strong portfolio</li></ul>",
  },
};
