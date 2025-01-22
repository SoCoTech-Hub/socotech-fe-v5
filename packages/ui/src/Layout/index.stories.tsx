import type { Meta, StoryFn } from "@storybook/react";

import { Layout } from "./index";

export default {
  title: "Layout",
  component: Layout,
  parameters: {
    layout: "fullscreen", // Ensures the component is displayed across the full viewport for layout testing
  },
} as Meta;

const Template: StoryFn = (args) => (
  <Layout {...args}>
    <div>
      <h1 className="text-2xl font-bold">Welcome to the Layout!</h1>
      <p className="mt-4 text-gray-700">
        This is a sample content area to test the layout component. You can add
        any child components or text here.
      </p>
    </div>
  </Layout>
);

export const DefaultLayout = Template.bind({});
