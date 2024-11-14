import type { SidebarItemListProps } from "./itemlist";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { SidebarMenuButton, SidebarMenuItem } from "../sidebar";

export interface SidebarItemProps {
  isExpanded: boolean;
  item: SidebarItemListProps;
}
const SidebarItem = (props: SidebarItemProps) => (
  <SidebarMenuItem>
    {props.item.subItems ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton>
            <div className="mr-2 h-4 w-4">{props.item.icon}</div>
            {props.isExpanded && <span>{props.item.title}</span>}
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {props.item.subItems.map((subItem, subIndex) => (
            <DropdownMenuItem key={subIndex} asChild>
              <a href={subItem.href}>
                <div className="mr-2 h-4 w-4">{subItem.icon}</div>
                {props.isExpanded && <span>{subItem.title}</span>}
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    ) : (
      <SidebarMenuButton asChild>
        <a href={props.item.href} className="flex items-center">
          <div className="mr-2 h-4 w-4">{props.item.icon}</div>
          {props.isExpanded && <span>{props.item.title}</span>}
        </a>
      </SidebarMenuButton>
    )}
  </SidebarMenuItem>
);
export default SidebarItem;
