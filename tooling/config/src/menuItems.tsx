import { Briefcase, FileText, Folder, Mail, Newspaper, Tv } from "lucide-react";

export const MenuItems = [
  { name: "Mail", href: "/", icon: Mail, platform: "inmail" },
  {
    name: "Job Applications",
    href: "/",
    icon: Briefcase,
    platform: "jobs",
  },
  { name: "Shows", href: "/shows", icon: Tv, platform: "shows" },
  { name: "News Feed", href: "/news", icon: Newspaper, platform: "dashboard" },
  {
    name: "Documents",
    icon: FileText,

    items: [
      { name: "Personal", href: "/personal" },
      { name: "Work", href: "/work" },
      { name: "Archive", href: "/archive" },
    ],
    platform: "documents",
  },
  {
    name: "Projects",
    icon: Folder,
    items: [
      { name: "Current", href: "/current" },
      { name: "Completed", href: "/completed" },
      { name: "Upcoming", href: "/upcoming" },
    ],
    platform: "projects",
  },
];
