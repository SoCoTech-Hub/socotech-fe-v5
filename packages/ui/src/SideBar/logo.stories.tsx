import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { SidebarLogoProps } from "./logo";
import SidebarLogo from "./logo";

export default {
  title: "Sidebar/Logo",
  component: SidebarLogo,
} as Meta;

const Template: StoryFn<SidebarLogoProps> = (args) => (
  <div className="bg-gray-900 p-4">
    <SidebarLogo {...args} />
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
