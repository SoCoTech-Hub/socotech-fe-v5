import type { ReactNode } from "react";
import { BookOpen, FileText, Rabbit, Settings, User } from "lucide-react";

export interface SidebarItemListProps {
  title: string;
  icon: ReactNode;
  href?: string; // Optional for expandable groups
  subItems?: SidebarItemListProps[]; // Allow nested items
}
//TODO: Setup links and icons
export const sidebarItems: SidebarItemListProps[] = [
  {
    title: "Playground",
    icon: <FileText />,
    subItems: [
      { title: "History", icon: <FileText />, href: "/history" },
      { title: "Starred", icon: <FileText />, href: "/starred" },
      { title: "Settings", icon: <Settings />, href: "/settings" },
      {
        title: "more shit",
        icon: <Rabbit />,
        subItems: [
          { title: "History", icon: <FileText />, href: "/history" },
          { title: "Starred", icon: <FileText />, href: "/starred" },
          { title: "Settings", icon: <Settings />, href: "/settings" },
        ],
      },
    ],
  },
  { title: "Models", icon: <User />, href: "/models" },
  { title: "Documentation", icon: <BookOpen />, href: "/documentation" },
  { title: "Settings", icon: <Settings />, href: "/settings" },
];
