import { Bell, Lock, Settings, User } from "lucide-react";

export const UserItems = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { separator: true },
  { name: "Logout", href: "/logout", icon: Lock },
];
