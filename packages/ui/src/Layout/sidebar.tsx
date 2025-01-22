"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CircleX, Menu } from "lucide-react";

import { MenuItems } from "@acme/config/menuItems";
import { UserItems } from "@acme/config/userItems";
import {
  useLogo,
  useOrganizationName,
} from "@acme/snippets/utils/contextUtils";

import { LayoutFooter } from "./footer";
import { MenuItem } from "./menuItem";

interface SidebarProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

export function LayoutSidebar({ isExpanded, toggleSidebar }: SidebarProps) {
  const pathname = usePathname();
  const orgName = useOrganizationName();
  const orgLogo = useLogo();

  return (
    <motion.div
      className={`border-r border-gray-200 bg-white ${
        isExpanded ? "w-64" : "w-20"
      } flex flex-col transition-all duration-300 ease-in-out`}
      animate={{ width: isExpanded ? 256 : 80 }}
    >
      <div className="flex items-center justify-between p-4">
        {isExpanded && (
          <a href="/">
            <img
              src={orgLogo || "https://placeholder.co/200x100"}
              alt={orgName || "Organization Logo"}
              className="h-8 w-16"
            />
          </a>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2"
          aria-label={isExpanded ? "Close sidebar" : "Open sidebar"}
          aria-expanded={isExpanded}
        >
          {isExpanded ? <CircleX /> : <Menu />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-2">
          {MenuItems.map((item) => (
            <li key={item.name}>
              <MenuItem
                {...item}
                isExpanded={isExpanded}
                activeLink={pathname}
              />
            </li>
          ))}
        </ul>
      </nav>

      {isExpanded && (
        <div className="border-t border-gray-200 p-4">
          <ul className="mt-2 space-y-2">
            {UserItems.map((item) =>
              !item.separator ? (
                <li key={item.name}>
                  <a
                    href={`${item.platform}/${item.href}`}
                    className="flex items-center space-x-2 text-sm hover:text-primary"
                  >
                    {item.icon ? (
                      <item.icon className="h-4 w-4" />
                    ) : (
                      <div className="h-4 w-4" />
                    )}
                    <span>{item.name}</span>
                  </a>
                </li>
              ) : (
                <div className="border-t border-gray-200 p-4" />
              ),
            )}
          </ul>
          <div className="mt-auto border-t border-gray-200 p-4">
            <LayoutFooter />
          </div>
        </div>
      )}
    </motion.div>
  );
}
