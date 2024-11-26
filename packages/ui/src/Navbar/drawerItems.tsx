import { Briefcase, FileText, Folder, Mail, Newspaper, Tv } from "lucide-react";

export const drawerItems = [
  { name: "Mail", href: "/mail", icon: Mail },
  { name: "Job Applications", href: "/jobs", icon: Briefcase },
  { name: "Shows", href: "/shows", icon: Tv },
  { name: "News Feed", href: "/news", icon: Newspaper },
  {
    name: "Documents",
    icon: FileText,
    items: [
      { name: "Personal", href: "/documents/personal" },
      { name: "Work", href: "/documents/work" },
      { name: "Archive", href: "/documents/archive" },
    ],
  },
  {
    name: "Projects",
    icon: Folder,
    items: [
      { name: "Current", href: "/projects/current" },
      { name: "Completed", href: "/projects/completed" },
      { name: "Upcoming", href: "/projects/upcoming" },
    ],
  },
];
