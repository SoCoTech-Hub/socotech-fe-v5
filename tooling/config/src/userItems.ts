import { Bell, Lock, Settings, User } from "lucide-react";

export const UserItems = [
  { name: "Profile", href: "/", icon: User, platform: "profile" },
  { name: "Settings", href: "/", icon: Settings, platform: "account" },
  { name: "Notifications", href: "/", icon: Bell, platform: "notification" },
  { separator: true },
  { name: "Logout", href: "/logout", icon: Lock },
];
