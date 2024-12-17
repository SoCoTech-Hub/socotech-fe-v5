"use client";

import { useState } from "react";
import { Menu, Settings } from "lucide-react";

import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import Logo from "../logo";
import { Sheet, SheetContent, SheetTrigger } from "../sheet";
import { DrawerContent } from "./drawer";
import { MenuItem } from "./menuItem";
import { menuItems } from "./menuItems";

interface NavbarProps {
  logoUrl?: string;
  logoName?: string;
}
export function Navbar({ logoUrl, logoName }: NavbarProps) {
  const [activeLink, setActiveLink] = useState("/");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    setIsDrawerOpen(false);
  };

  return (
    <nav className="border-b bg-background">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleLinkClick("/")}
              className="text-2xl font-bold text-primary"
            >
              {logoUrl ? <Logo url={logoUrl} /> : logoName}
            </button>
            <div className="hidden space-x-4 sm:flex">
              {menuItems.map((item) => (
                <MenuItem
                  key={item.name}
                  name={item.name}
                  href={item.href}
                  activeLink={activeLink}
                  onClick={handleLinkClick}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <DrawerContent
                  activeLink={activeLink}
                  onClick={handleLinkClick}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      {/* Settings Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-3">
            <Settings className="w-5 h-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleLinkClick("/profile")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleLinkClick("/account")}>
            Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleLinkClick("/preferences")}>
            Preferences
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleLinkClick("/logout")}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* User Avatar Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-3">
            <User className="w-5 h-5" />
            <ChevronDown className="w-3 h-3 ml-1" />
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleLinkClick("/profile")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleLinkClick("/dashboard")}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleLinkClick("/logout")}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Right Drawer Trigger */}
      <Sheet open={isRightDrawerOpen} onOpenChange={setIsRightDrawerOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="ml-3">
            <Menu className="w-5 h-5" />
            <span className="sr-only">Open right menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex w-[300px] flex-col sm:w-[400px]"
        >
          <SheetHeader>
            <SheetTitle>Additional Menu</SheetTitle>
            <SheetDescription>
              Quick access to various features
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col flex-grow mt-6 space-y-4 overflow-y-auto">
            {drawerItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleLinkClick(item.href)}
                className={cn(
                  "flex items-center text-foreground hover:text-primary",
                  activeLink === item.href && "font-semibold text-primary",
                )}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.name}
              </button>
            ))}
            <div className="space-y-2">
              {expandableItems.map((item) => (
                <ExpandableItem
                  key={item.name}
                  item={item}
                  activeLink={activeLink}
                  setActiveLink={handleLinkClick}
                />
              ))}
            </div>
          </div>
          <div className="pt-4 mt-auto border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage
                    src="/avatar-placeholder.png"
                    alt="User avatar"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">
                    john.doe@example.com
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="w-5 h-5" />
                    <span className="sr-only">Open user settings</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleLinkClick("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleLinkClick("/settings")}
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleLinkClick("/notifications")}
                  >
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleLinkClick("/logout")}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      {/* Mobile menu button */}
      <div className="flex items-center sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Open main menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Navigate through our site</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col flex-grow mt-6 space-y-4 overflow-y-auto">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleLinkClick(item.href)}
                  className={cn(
                    "text-left text-foreground hover:text-primary",
                    activeLink === item.href && "font-semibold text-primary",
                  )}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => handleLinkClick("/calendar")}
                className={cn(
                  "flex items-center text-left text-foreground hover:text-primary",
                  activeLink === "/calendar" && "font-semibold text-primary",
                )}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Calendar
              </button>
              <Button variant="ghost" className="justify-start px-0">
                <Bell className="w-5 h-5 mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" className="justify-start px-0">
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" className="justify-start px-0">
                <User className="w-5 h-5 mr-2" />
                Profile
              </Button>
              {drawerItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleLinkClick(item.href)}
                  className={cn(
                    "flex items-center text-left text-foreground hover:text-primary",
                    activeLink === item.href && "font-semibold text-primary",
                  )}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.name}
                </button>
              ))}
              <div className="space-y-2">
                {expandableItems.map((item) => (
                  <ExpandableItem
                    key={item.name}
                    item={item}
                    activeLink={activeLink}
                    setActiveLink={handleLinkClick}
                  />
                ))}
              </div>
            </div>
            <div className="pt-4 mt-auto border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar>
                    <AvatarImage
                      src="/avatar-placeholder.png"
                      alt="User avatar"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-muted-foreground">
                      john.doe@example.com
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Settings className="w-5 h-5" />
                      <span className="sr-only">Open user settings</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleLinkClick("/profile")}
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleLinkClick("/settings")}
                    >
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleLinkClick("/notifications")}
                    >
                      Notifications
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleLinkClick("/logout")}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
