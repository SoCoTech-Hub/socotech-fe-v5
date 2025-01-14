/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryFn } from "@storybook/react";

import { SplitPageForm } from "./splitPageForm";

export default {
  title: "SplitPageForm",
  component: SplitPageForm,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: StoryFn = (args) => (
  <SplitPageForm
    imageUrl={""}
    imageAlt={""}
    formTitle={""}
    fields={[]}
    onSubmit={(data) =>
      alert(`Form submitted with data: ${JSON.stringify(data)}`)
    }
    {...args}
  />
);

export const DefaultForm = Template.bind({});
DefaultForm.args = {
  imageUrl: "https://via.placeholder.com/600x400",
  imageAlt: "Placeholder image",
  formTitle: "Contact Us",
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "message", label: "Message", type: "textarea" },
  ],
  onSubmit: (data: any) =>
    alert(`Form submitted with data: ${JSON.stringify(data)}`),
  imageSide: "left",
};

export const RightImageForm = Template.bind({});
RightImageForm.args = {
  ...DefaultForm.args,
  imageSide: "right",
};

export const ComplexForm = Template.bind({});
ComplexForm.args = {
  imageUrl: "https://via.placeholder.com/600x400",
  imageAlt: "Placeholder image",
  formTitle: "Sign Up",
  fields: [
    { name: "username", label: "Username", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
    { name: "bio", label: "Short Bio", type: "textarea" },
  ],
  onSubmit: (data: any) =>
    alert(`Form submitted with data: ${JSON.stringify(data)}`),
  imageSide: "left",
};

export const NoFieldsForm = Template.bind({});
NoFieldsForm.args = {
  imageUrl: "https://via.placeholder.com/600x400",
  imageAlt: "Placeholder image",
  formTitle: "Empty Form",
  fields: [],
  onSubmit: (data: any) =>
    alert(`Form submitted with data: ${JSON.stringify(data)}`),
  imageSide: "left",
};
