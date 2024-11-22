export interface menuItem {
  title?: string;
  href?: string;
  isSeparator?: boolean;
  items?: menuItem[];
}

export const MenuItems: menuItem[] = [
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Settings",
    href: "/settings",
  },
  { isSeparator: true },
  {
    title: "Log out",
    href: "/logout",
  },
];
