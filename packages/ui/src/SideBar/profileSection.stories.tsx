import type { Meta, StoryFn } from "@storybook/react";
import React from "react";

import type { SidebarProfileSectionProps } from "./profileSection";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import SidebarProfile from "./profile";
import SidebarProfileSection from "./profileSection";

export default {
  title: "Sidebar/ProfileSection",
  component: SidebarProfileSection,
} as Meta;

const Template: StoryFn<SidebarProfileSectionProps> = (args) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost">
        <SidebarProfile
          isExpanded={args.isExpanded}
          avatarSrc={"https://via.placeholder.com/100"}
          name={"John Doe"}
          email={"@johnDoe.com"}
        />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <SidebarProfileSection {...args} />
    </DropdownMenuContent>
  </DropdownMenu>
);

export const Default = Template.bind({});
Default.args = {
  isExpanded: false,
};
