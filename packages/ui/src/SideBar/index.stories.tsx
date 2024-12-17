import type { Meta, StoryFn } from "@storybook/react";

import CustomSidebar from "./index";
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
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  ...Expanded.args,
  initialExpanded: false, // Demonstrates the collapsed sidebar state
};
