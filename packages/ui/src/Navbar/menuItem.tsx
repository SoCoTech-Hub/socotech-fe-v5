import { ChevronRight } from "lucide-react";

import { cn } from "..";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible";

interface MenuItemProps {
  name: string;
  href?: string;
  icon?: React.ElementType; // Optional icon
  items?: { name: string; href: string }[]; // Optional nested items
  activeLink: string;
  onClick?: (href: string) => void;
}

export function MenuItem({
  name,
  href,
  icon: Icon,
  items,
  activeLink,
  onClick,
}: MenuItemProps) {
  // Check if the item has nested items
  const isExpandable = items && items.length > 0;

  if (isExpandable) {
    return (
      <Collapsible>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 hover:text-primary">
          <div className="flex items-center">
            {Icon && <Icon className="mr-2 h-5 w-5" />}
            <span>{name}</span>
          </div>
          <ChevronRight className="h-5 w-5 transition-transform duration-200" />
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-7 mt-1 space-y-1">
          {items.map((subItem) => (
            <button
              key={subItem.name}
              onClick={() => onClick?.(subItem.href)}
              className={cn(
                "block w-full py-1 text-left text-sm hover:text-primary",
                activeLink === subItem.href && "font-semibold text-primary",
              )}
            >
              <a href={subItem.href}>{subItem.name}</a>
            </button>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  // Render a single-level item
  return (
    <button
      onClick={() => href && onClick?.(href)}
      className={cn(
        "inline-flex items-center px-1 pt-1 text-sm font-medium",
        activeLink === href
          ? "border-b-2 border-primary text-primary"
          : "text-foreground hover:border-b-2 hover:border-primary hover:text-primary",
      )}
    >
      <a href={href}>
        {Icon && <Icon className="mr-2 h-5 w-5" />}
        {name}
      </a>
    </button>
  );
}
