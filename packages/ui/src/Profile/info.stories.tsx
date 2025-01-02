import type { Meta, StoryObj } from "@storybook/react";

import InfoSection from "./info";

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

const onSaveMock = (updatedSection: any) => {
  console.log("Saved section:", updatedSection);
};

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
  render: () => (
    <InfoSection
      dropdowns={sampleDropdowns}
      initialUserInfo={sampleUserInfo}
      onSave={onSaveMock}
    />
  ),
};

export const LoadingState: Story = {
  render: () => (
    <InfoSection
      dropdowns={sampleDropdowns}
      initialUserInfo={sampleUserInfo}
      onSave={onSaveMock}
    />
  ),
  parameters: {
    // Simulate loading state by setting a delay to showcase the skeleton loader
    chromatic: { delay: 100 },
  },
};
