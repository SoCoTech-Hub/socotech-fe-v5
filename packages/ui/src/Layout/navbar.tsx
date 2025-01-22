"use client";

import { LogOut } from "lucide-react";

import { UserItems } from "@acme/config/userItems";
import {
  useDisplayName,
  useLogo,
  useOrganizationName,
  useProfilePic,
} from "@acme/snippets/utils/contextUtils";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";

export function LayoutNavbar() {
  const orgLogo = useLogo();
  const orgName = useOrganizationName();
  const profilePic = useProfilePic();
  const userName = useDisplayName();

  return (
    <header className="border-b border-gray-200 bg-white px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <a href="/">
            <img src={orgLogo} alt={orgName} className="h-8 w-16" />
          </a>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                <AvatarImage src={profilePic} alt="User" />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {UserItems.map((item, index) =>
              item.separator ? (
                <DropdownMenuSeparator key={`separator-${index}`} />
              ) : (
                <DropdownMenuItem key={item.name}>
                  <a href={item.href}>
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    <span>{item.name}</span>
                  </a>
                </DropdownMenuItem>
              ),
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <a href="~/auth/logout">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
