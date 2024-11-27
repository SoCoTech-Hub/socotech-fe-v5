import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import InfoSection from "./info";

const meta: Meta<typeof InfoSection> = {
  title: "Profile/Info",
  component: InfoSection,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof InfoSection>;

export const Default: Story = {
  render: () => <InfoSection initialUserInfo={
  personalInfo: {
    idNumber: "",
    dateOfBirth: "",
    gender: "",
    province: "",
    school: "",
    district: "",
  },
  deviceInfo: { serialNumber: "", imei: "" },
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
} />,
};

export const LoadingState: Story = {
  render: () => <InfoSection />,
  parameters: {
    // Simulate loading state by setting a delay to showcase the skeleton loader
    chromatic: { delay: 100 },
  },
};
