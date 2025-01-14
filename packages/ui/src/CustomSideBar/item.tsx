import type { SidebarItemListProps } from "./itemlist";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { SidebarMenuButton } from "../sidebar";

export interface SidebarItemProps {
  isExpanded: boolean;
  item: SidebarItemListProps;
}

export const SidebarItem = ({ isExpanded, item }: SidebarItemProps) => (
  <SidebarMenuButton>
    {item.subItems ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            {item.icon && <div className="mr-2 h-4 w-4">{item.icon}</div>}
            {isExpanded && <span>{item.title}</span>}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {item.subItems.map((subItem, index) => (
            <DropdownMenuItem key={index}>
              <a href={subItem.href}>
                {subItem.icon && (
                  <div className="mr-2 h-4 w-4">{subItem.icon}</div>
                )}
                {isExpanded && <span>{subItem.title}</span>}
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <a href={item.href} className="flex items-center">
        {item.icon && <div className="mr-2 h-4 w-4">{item.icon}</div>}
        {isExpanded && <span>{item.title}</span>}
      </a>
    )}
  </SidebarMenuButton>
);
