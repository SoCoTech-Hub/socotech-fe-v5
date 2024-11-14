"use client";

import React from "react";
import {
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import type { SidebarItemListProps } from "./itemlist";
import type { SidebarLogoProps } from "./logo";
import type { SidebarProfileSectionProps } from "./profileSection";
import { cn } from "..";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "../sidebar";
import SidebarItem from "./item";
import SidebarLogo from "./logo";
import SidebarProfile, { SidebarProfileProps } from "./profile";
import SidebarProfileSection from "./profileSection";

interface SidebarProps {
  logo: SidebarLogoProps;
  menuItems: SidebarItemListProps[];
  userProfileOptions: SidebarProfileProps;
  userProfileMenuItems: SidebarProfileSectionProps;
}

export default function CustomSidebar({
  logo,
  menuItems,
  userProfileOptions,
  userProfileMenuItems,
}: SidebarProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SidebarProvider>
      <Sidebar
        className={cn(
          "flex h-screen flex-col justify-between p-4 transition-all duration-300",
          isExpanded ? "w-64" : "w-20",
        )}
      >
        <div>
          <SidebarHeader className="flex items-center justify-between pb-4">
            {isExpanded ? (
              <SidebarLogo url={logo.url} />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                <span className="text-xl font-bold">
                  <SidebarLogo altUrl={logo.altUrl} />
                </span>
              </div>
            )}
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              {isExpanded ? (
                <ChevronsLeft className="h-4 w-4" />
              ) : (
                <ChevronsRight className="h-4 w-4" />
              )}
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarItem isExpanded={isExpanded} item={item} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </div>
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarProfile
                isExpanded={isExpanded}
                avatarSrc={userProfileOptions.avatarSrc}
                email={userProfileOptions.email}
                name={userProfileOptions.name}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <SidebarProfileSection
                isExpanded={isExpanded}
                items={userProfileMenuItems}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
