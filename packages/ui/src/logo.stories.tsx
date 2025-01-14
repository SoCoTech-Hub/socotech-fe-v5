import type { Meta, StoryFn } from "@storybook/react";

import type { LogoProps } from "./logo";
import { Logo } from "./logo";

export default {
  title: "Logo",
  component: Logo,
} as Meta;

const Template: StoryFn<LogoProps> = (args) => (
  <div className="bg-gray-900 p-4">
    <Logo {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  url: "https://via.placeholder.com/100",
};

export const AltUrl = Template.bind({});
AltUrl.args = {
  altUrl: "https://via.placeholder.com/50",
};
