import type { Meta, StoryFn } from "@storybook/react";

import type { SidebarItemProps } from "./item";
import { SidebarProvider } from "../sidebar";
import SidebarItem from "./item";

export default {
  title: "Sidebar/Item",
  component: SidebarItem,
} as Meta;

const Template: StoryFn<SidebarItemProps> = (args) => (
  <SidebarProvider className="w-64 bg-gray-900 p-4">
    <SidebarItem {...args} />
  </SidebarProvider>
);

export const Default = Template.bind({});
Default.args = {
  isExpanded: true,
  item: {
    title: "Playground",
    icon: <span>📄</span>,
    href: "/playground",
  },
};

export const WithSubItems = Template.bind({});
WithSubItems.args = {
  isExpanded: true,
  item: {
    title: "Playground",
    icon: <span>📄</span>,
    subItems: [
      { title: "History", icon: <span>⏳</span>, href: "/history" },
      { title: "Starred", icon: <span>⭐</span>, href: "/starred" },
    ],
  },
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  isExpanded: false,
  item: {
    title: "Playground",
    icon: <span>📄</span>,
    href: "/playground",
  },
};
