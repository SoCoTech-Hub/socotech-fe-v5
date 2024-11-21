import type { ReactNode } from "react";
import React from "react";
import { BookOpen, FileText, Rabbit, Settings, User } from "lucide-react";

export interface SidebarProfileListItem {
  title: string;
  icon: ReactNode;
  url?: string; // Optional for expandable groups
  subItems?: SidebarProfileListItem[]; // Allow nested items
}

export interface SidebarProfileListProps {
  items: SidebarProfileListItem[];
  expanded: boolean;
}

//TODO: Setup links and icons
export const SidebarProfileList: SidebarProfileListItem[] = [
  {
    title: "Playground",
    icon: <FileText />,
    subItems: [
      { title: "History", icon: <FileText />, url: "/history" },
      { title: "Starred", icon: <FileText />, url: "/starred" },
      { title: "Settings", icon: <Settings />, url: "/settings" },
      {
        title: "more shit",
        icon: <Rabbit />,
        subItems: [
          { title: "History", icon: <FileText />, url: "/history" },
          { title: "Starred", icon: <FileText />, url: "/starred" },
          { title: "Settings", icon: <Settings />, url: "/settings" },
        ],
      },
    ],
  },
  { title: "Models", icon: <User />, url: "/models" },
  { title: "Documentation", icon: <BookOpen />, url: "/documentation" },
  { title: "Settings", icon: <Settings />, url: "/settings" },
];
