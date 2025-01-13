import { X } from "lucide-react";

import type { User } from "./index";
import { Button } from "../button";
import Logo from "../logo";
import { cn } from "../utils";
import { MenuItems } from "./menuItems";

export interface MobileMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user?: User;
  companyName?: string;
  companyLogo?: string;
}

function MobileMenu({
  open,
  setOpen,
  user,
  companyName,
  companyLogo,
}: MobileMenuProps) {
  return (
    <div
      className={cn("lg:hidden", open ? "block" : "hidden")}
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 z-50"></div>
      <div className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-background sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a href="/" className="-m-1.5 p-1.5">
            {companyName && <span className="sr-only">{companyName}</span>}
            {companyLogo && <Logo url={companyLogo} />}
          </a>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <span className="sr-only">Close menu</span>
            <X className="w-6 h-6" aria-hidden="true" />
          </Button>
        </div>
        <div className="flow-root mt-6">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="py-6 space-y-2">
              {MenuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 rounded-lg text-foreground hover:bg-accent"
                >
                  {item.title}
                </a>
              ))}
            </div>
            <div className="py-6">
              {user ? (
                <div className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-foreground hover:bg-accent">
                  {user.name}
                </div>
              ) : (
                <a
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-foreground hover:bg-accent"
                >
                  Log in
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MobileMenu;
