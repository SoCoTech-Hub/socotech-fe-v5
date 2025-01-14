import type { Meta, StoryFn } from "@storybook/react";

import { CreateSupportForm } from "./form";

export default {
  title: "Support/CreateSupportForm",
  component: CreateSupportForm,
} as Meta;

const Template: StoryFn<{
  onSubmit: (title: string, description: string, location: string) => void;
}> = (args) => <CreateSupportForm {...args} />;

export const DefaultCreateSupportForm = Template.bind({});
DefaultCreateSupportForm.args = {
  onSubmit: (title, description, location) => {
    console.log("Form submitted with: ", { title, description, location });
  },
};
