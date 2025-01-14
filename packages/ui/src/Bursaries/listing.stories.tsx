import type { Meta, StoryObj } from "@storybook/react";

import { BursaryListing } from "./listing";

const meta: Meta<typeof BursaryListing> = {
  title: "Bursary/Listing",
  component: BursaryListing,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: { type: "text" },
      description: "Unique identifier for the bursary listing.",
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
      description: "Handler called when a bursary is selected.",
    },
    bgColor: {
      control: { type: "text" },
      description: "Background color for the icon area.",
    },
    iconSvg: {
      control: { type: "text" },
      description: "SVG icon for the bursary listing.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BursaryListing>;

export const Default: Story = {
  render: (args) => <BursaryListing {...args} />,
  args: {
    id: "1",
    applicationFeatureImage: "https://via.placeholder.com/56",
    courseTitle: "Software Engineering Bursary",
    courseCompanyName: "Tech Corp",
    courseDescription: "A bursary opportunity for aspiring software engineers.",
    setSelection: (id) => console.log("Selected bursary:", id),
    bgColor: "bg-blue-500",
    iconSvg: "",
  },
};

export const WithIconSvg: Story = {
  render: (args) => <BursaryListing {...args} />,
  args: {
    id: "2",
    courseTitle: "Data Science Bursary",
    courseCompanyName: "Data Insights Inc.",
    courseDescription: "Bursary for students pursuing data science.",
    setSelection: (id) => console.log("Selected bursary:", id),
    iconSvg:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-star"><polygon points="5 11 19 11 12 2 9 22 12 17 15 22"></polygon></svg>',
  },
};

export const NoImageOrIcon: Story = {
  render: (args) => <BursaryListing {...args} />,
  args: {
    id: "3",
    courseTitle: "Business Management Bursary",
    courseCompanyName: "Biz Leaders",
    courseDescription: "Financial support for future business leaders.",
    setSelection: (id) => console.log("Selected bursary:", id),
  },
};
