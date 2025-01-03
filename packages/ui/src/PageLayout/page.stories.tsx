import type { Meta, StoryFn } from "@storybook/react";

import Page, { PageProps } from "./";

export default {
  title: "Page",
  component: Page,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A reusable page component with dynamic alerts, buttons, and customizable background.",
      },
    },
  },
  argTypes: {
    header: {
      control: "text",
      description: "The header text displayed at the top of the page.",
      defaultValue: "Welcome!",
    },
    message: {
      control: "text",
      description: "The main message displayed on the page.",
      defaultValue: "Please proceed with the next steps.",
    },
    buttons: {
      control: "object",
      description: "An array of React nodes for rendering action buttons.",
    },
    background: {
      control: "text",
      description:
        "URL of the background image for the page. Defaults to `./background1.png` if not provided.",
    },
    error: {
      control: "text",
      description: "Error message displayed in the alert.",
    },
    success: {
      control: "text",
      description: "Success message displayed in the alert.",
    },
  },
} as Meta;

const Template: StoryFn<PageProps> = (args) => <Page {...args} />;

export const Default = Template.bind({});
Default.args = {
  header: "Welcome!",
  message: "Please proceed with the next steps.",
  buttons: [
    <button key="continue" className="btn-primary">
      Continue
    </button>,
    <button key="cancel" className="btn-secondary">
      Cancel
    </button>,
  ],
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  error: "Something went wrong. Please try again.",
};

export const WithSuccess = Template.bind({});
WithSuccess.args = {
  ...Default.args,
  success: "Your operation was successful!",
};

export const CustomBackground = Template.bind({});
CustomBackground.args = {
  ...Default.args,
  background: "./custom-background.jpg",
};
