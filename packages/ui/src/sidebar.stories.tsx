import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ChevronUp } from "lucide-react";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "./sidebar";

const meta: Meta<typeof SidebarProvider> = {
  title: "Sidebar",
  component: SidebarProvider,
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: {
      control: "boolean",
      description: "Sets whether the sidebar is open by default.",
      defaultValue: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof SidebarProvider>;

export const Default: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <SidebarProvider {...args}>
      <SidebarTrigger className="mb-4">
        <Button>Toggle Sidebar</Button>
      </SidebarTrigger>
      <Sidebar side="left" collapsible="offcanvas">
        <SidebarHeader>
          <h2 className="text-lg font-semibold">Sidebar Header</h2>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Dashboard</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Settings</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Profile</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Notifications</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  ),
};

export const CollapsibleIconMode: Story = {
  args: {
    defaultOpen: false,
  },
  render: (args) => (
    <SidebarProvider {...args}>
      <SidebarTrigger className="mb-4">
        <Button variant="ghost">Open Sidebar</Button>
      </SidebarTrigger>
      <Sidebar side="right" collapsible="icon">
        <SidebarHeader>
          <h2 className="text-lg font-semibold">Icon Mode Sidebar</h2>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Home">🏠 Home</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Messages">
                💬 Messages
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Notifications">
                🔔 Notifications
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <Button variant="ghost">Close</Button>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  ),
};
