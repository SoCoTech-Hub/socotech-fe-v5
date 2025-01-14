import type { Meta, StoryFn } from "@storybook/react";

import type { SidebarProfileProps } from "./profile";
import { SidebarProfile } from "./profile";

export default {
  title: "Sidebar/Profile",
  component: SidebarProfile,
} as Meta;

const Template: StoryFn<SidebarProfileProps> = (args) => (
  <SidebarProfile {...args} />
);

export const Expanded = Template.bind({});
Expanded.args = {
  isExpanded: true,
  avatarSrc: "https://via.placeholder.com/40",
  name: "John Doe",
  email: "johndoe@example.com",
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  isExpanded: false,
  avatarSrc: "https://via.placeholder.com/40",
  name: "John Doe",
  email: "johndoe@example.com",
};
