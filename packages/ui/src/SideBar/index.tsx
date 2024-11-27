"use client";

import React, { useState } from "react";
import { ChevronsLeft } from "lucide-react";

import type { LogoProps } from "../logo";
import type { SidebarItemListProps } from "./itemlist";
import type { SidebarProfileProps } from "./profile";
import type { SidebarProfileListItem } from "./profileList";
import { cn } from "..";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import SidebarLogo from "../logo";
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
import SidebarProfile from "./profile";
import SidebarProfileSection from "./profileSection";

interface SidebarProps {
  logo: LogoProps;
  menuItems: SidebarItemListProps[];
  userProfileOptions: SidebarProfileProps;
  userProfileMenuItems?: SidebarProfileListItem[];
}

export default function CustomSidebar({
  logo,
  menuItems,
  userProfileOptions,
  userProfileMenuItems,
}: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <SidebarProvider>
      <Sidebar
        className={cn(
          "flex h-screen flex-col justify-between bg-gray-900 p-4 text-white transition-all duration-300",
          isExpanded ? "w-1/2" : "w-1/12",
        )}
      >
        {/* Header */}
        <SidebarHeader className="flex items-center justify-between pb-4">
          <a href="/">
            {isExpanded ? (
              <SidebarLogo url={logo.url} />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full">
                <SidebarLogo url={logo.altUrl} />
              </div>
            )}
          </a>
          <Button variant="outline" size="icon" onClick={toggleSidebar}>
            <ChevronsLeft
              className={`h-8 w-8 fill-black ${isExpanded ? "rotate-180" : ""}`}
            />
          </Button>
        </SidebarHeader>

        {/* Menu */}
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item, index) => (
              <SidebarMenuItem key={index} className="text-primaryForeground">
                <SidebarItem isExpanded={isExpanded} item={item} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <SidebarProfile
                  isExpanded={isExpanded}
                  avatarSrc={userProfileOptions.avatarSrc}
                  name={userProfileOptions.name}
                  email={userProfileOptions.email}
                />
              </Button>
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
