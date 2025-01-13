"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "../button";
import Logo from "../logo";
import { cn } from "../utils";
import MobileMenu from "./mobileMenu";
import UserMenu from "./userMenu";

export interface NavItem {
  title: string;
  href: string;
}

export interface User {
  name: string;
  email: string;
  image?: string;
}

export interface AuthNavbarProps extends React.HTMLAttributes<HTMLElement> {
  items?: NavItem[];
  user?: User;
  companyName: string;
  companyLogo: string;
}

export function AuthNavbar({
  companyName,
  companyLogo,
  className,
  items,
  user,
  ...props
}: AuthNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={cn("bg-background", className)} {...props}>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{companyName}</span>
            <Logo url={companyLogo} />
          </a>
        </div>
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {items?.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="text-sm font-semibold leading-6 text-foreground hover:text-foreground/80"
            >
              {item.title}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <UserMenu {...user} />
          ) : (
            <a
              href="/login"
              className="text-sm font-semibold leading-6 text-foreground hover:text-foreground/80"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          )}
        </div>
      </nav>
      <MobileMenu
        open={mobileMenuOpen}
        setOpen={setMobileMenuOpen}
        user={user}
      />
    </header>
  );
}
