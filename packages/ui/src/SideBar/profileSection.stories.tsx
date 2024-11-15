import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { SidebarProfileSectionProps } from "./profileSection";
import SidebarProfileSection from "./profileSection";

export default {
  title: "Sidebar/ProfileSection",
  component: SidebarProfileSection,
} as Meta;

const Template: StoryFn<SidebarProfileSectionProps> = (args) => (
  <div className="bg-gray-900 p-4">
    <SidebarProfileSection {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  isExpanded: true,
  items: [
    { icon: <span>👤</span>, name: "Profile", href: "/profile" },
    { icon: <span>⚙️</span>, name: "Settings", href: "/settings" },
    { icon: <span>🚪</span>, name: "Sign Out", href: "/sign-out" },
  ],
};
