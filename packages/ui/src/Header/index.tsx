"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, User, X } from "lucide-react";

import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";

interface NavItem {
  label: string;
  href: string;
}

interface HeaderProps {
  logo: string;
  navItems: NavItem[];
}

export const Header: React.FC<HeaderProps> = ({ logo, navItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggles the state of the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <Link scroll={false} href={"/"}>
            <a className="flex items-center">
              <Image src={logo} alt="Logo" width={40} height={40} />
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-4 md:flex">
            {navItems.map((item) => (
              <Link
                legacyBehavior
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Dropdown for Desktop */}
          <div className="hidden items-center space-x-4 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                legacyBehavior
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900"
              >
                <a onClick={toggleMobileMenu}>{item.label}</a>
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-200 px-4 pb-3 pt-4">
            <div className="flex items-center">
              <User className="h-10 w-10 rounded-full" />
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  User Name
                </div>
                <div className="text-sm font-medium text-gray-500">
                  user@example.com
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={toggleMobileMenu}
              >
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={toggleMobileMenu}
              >
                Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={toggleMobileMenu}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
