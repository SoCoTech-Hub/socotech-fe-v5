import type { Meta, StoryFn } from "@storybook/react";

import { FormLists } from "./formList";

export default {
  title: "Support/FormList",
  component: () => <div>{JSON.stringify(FormLists)}</div>,
} as Meta;

const Template: StoryFn = () => <div>{JSON.stringify(FormLists)}</div>;

export const Default = Template.bind({});
Default.args = {};
