import type { Meta, StoryFn } from "@storybook/react";

import ZoomPoll, { PollProps } from "./poll";

export default {
  title: "Zoom/ZoomPoll",
  component: ZoomPoll,
} as Meta;

const Template: StoryFn<PollProps> = (args) => <ZoomPoll {...args} />;

export const DefaultZoomPoll = Template.bind({});
DefaultZoomPoll.args = {
  question: "What is your favorite programming language?",
  options: [
    { id: "1", text: "JavaScript" },
    { id: "2", text: "Python" },
    { id: "3", text: "TypeScript" },
    { id: "4", text: "C#" },
  ],
  onSubmit: (selectedOption) => {
    console.log("Selected option: ", selectedOption);
  },
};
