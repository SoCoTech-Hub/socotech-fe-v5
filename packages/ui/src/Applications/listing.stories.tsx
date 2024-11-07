import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { ApplicationsListing } from "./listing";

const meta: Meta<typeof ApplicationsListing> = {
  title: "Applications/Listing",
  component: ApplicationsListing,
  tags: ["autodocs"],
  argTypes: {
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
      description: "Handler called when an application is selected.",
    },
    bgColor: {
      control: { type: "text" },
      description: "Background color for the icon area.",
    },
    svgIcon: {
      control: { type: "text" },
      description: "SVG icon for the application.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ApplicationsListing>;

export const Default: Story = {
  render: (args) => <ApplicationsListing {...args} />,
  args: {
    id: "1",
    applicationFeatureImage: "https://via.placeholder.com/56",
    courseTitle: "React Basics",
    courseCompanyName: "Acme Corp",
    courseDescription: "Learn the basics of React in this introductory course.",
    setSelection: (id) => console.log("Selected application: ", id),
    bgColor: "bg-primary",
    svgIcon: "",
  },
};

export const WithSVGIcon: Story = {
  render: (args) => <ApplicationsListing {...args} />,
  args: {
    id: "2",
    courseTitle: "Advanced TypeScript",
    courseCompanyName: "Tech Solutions",
    courseDescription: "Deep dive into TypeScript advanced features.",
    setSelection: (id) => console.log("Selected application: ", id),
    svgIcon:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-star"><polygon points="5 11 19 11 12 2 9 22 12 17 15 22"></polygon></svg>',
  },
};

export const NoImageOrIcon: Story = {
  render: (args) => <ApplicationsListing {...args} />,
  args: {
    id: "3",
    courseTitle: "UI/UX Design Principles",
    courseCompanyName: "Creative Agency",
    courseDescription: "Explore the core principles of great UI/UX design.",
    setSelection: (id) => console.log("Selected application: ", id),
  },
};
