import type { SidebarProfileListItem } from "./profileList";
import { DropdownMenuItem } from "../dropdown-menu";
import { SidebarProfileList } from "./profileList";

export interface SidebarProfileSectionProps {
  items?: SidebarProfileListItem[];
  isExpanded?: boolean;
}
export const SidebarProfileSection = ({
  items = SidebarProfileList, // Fallback to SidebarProfileList
  isExpanded = false,
}: SidebarProfileSectionProps) => {
  return items.map((item, index) => (
    <DropdownMenuItem key={`dropdown-${index}`}>
      <a href={item.url}>
        <div className="mr-2 h-4 w-4">{item.icon}</div>
        {isExpanded && <span>{item.title}</span>}
      </a>
    </DropdownMenuItem>
  ));
};
