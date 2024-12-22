import type { Meta, StoryObj } from "@storybook/react";

import QualificationListing from "./listing";

const meta: Meta<typeof QualificationListing> = {
  title: "Qualification/Listing",
  component: QualificationListing,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: { type: "text" },
      description: "Unique identifier for the qualification listing.",
    },
    applicationFeatureImage: {
      control: { type: "text" },
      description: "URL of the feature image for the application.",
    },
    courseTitle: {
      control: { type: "text" },
      description: "Title of the course.",
    },
    courseCompanyName: {
      control: { type: "text" },
      description: "Name of the company offering the course.",
    },
    courseDescription: {
      control: { type: "text" },
      description: "Short description of the course.",
    },
    setSelection: {
      action: "selectionChanged",
      description: "Handler called when a qualification is selected.",
    },
    bgColor: {
      control: { type: "text" },
      description: "Background color for the icon area.",
    },
    iconSvg: {
      control: { type: "text" },
      description: "SVG icon for the qualification listing.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof QualificationListing>;

export const Default: Story = {
  render: (args) => <QualificationListing {...args} />,
  args: {
    id: "1",
    applicationFeatureImage: "https://via.placeholder.com/56",
    courseTitle: "Software Engineering Qualification",
    courseCompanyName: "Tech Corp",
    courseDescription: "A qualification opportunity for aspiring software engineers.",
    setSelection: (id) => console.log("Selected qualification:", id),
    bgColor: "bg-blue-500",
    iconSvg: "",
  },
};

export const WithIconSvg: Story = {
  render: (args) => <QualificationListing {...args} />,
  args: {
    id: "2",
    courseTitle: "Data Science Qualification",
    courseCompanyName: "Data Insights Inc.",
    courseDescription: "Qualification for students pursuing data science.",
    setSelection: (id) => console.log("Selected qualification:", id),
    iconSvg:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-star"><polygon points="5 11 19 11 12 2 9 22 12 17 15 22"></polygon></svg>',
  },
};

export const NoImageOrIcon: Story = {
  render: (args) => <QualificationListing {...args} />,
  args: {
    id: "3",
    courseTitle: "Business Management Qualification",
    courseCompanyName: "Biz Leaders",
    courseDescription: "Financial support for future business leaders.",
    setSelection: (id) => console.log("Selected qualification:", id),
  },
};
