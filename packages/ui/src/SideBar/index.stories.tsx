import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import CustomSidebar from ".";
import { sidebarItems } from "./itemlist";

export default {
  title: "Sidebar/Index",
  component: CustomSidebar,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: StoryFn = (args) => <CustomSidebar {...args} />;

export const Expanded = Template.bind({});
Expanded.args = {
  logo: {
    url: "https://via.placeholder.com/100",
    altUrl: "https://via.placeholder.com/50",
  },
  menuItems: sidebarItems,
  userProfileOptions: {
    avatarSrc: "https://via.placeholder.com/40",
    name: "John Doe",
    email: "johndoe@example.com",
  },
  userProfileMenuItems: {
    items: [
      { icon: <span>👤</span>, name: "Profile", href: "/profile" },
      { icon: <span>⚙️</span>, name: "Settings", href: "/settings" },
      { icon: <span>🚪</span>, name: "Sign Out", href: "/sign-out" },
    ],
  },
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  ...Expanded.args,
  initialExpanded: false, // Demonstrates the collapsed sidebar state
};
