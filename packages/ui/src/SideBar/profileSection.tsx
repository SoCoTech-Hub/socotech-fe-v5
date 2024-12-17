import type { SidebarProfileListItem } from "./profileList";
import { DropdownMenuItem } from "../dropdown-menu";
import { SidebarProfileList } from "./profileList";

export interface SidebarProfileSectionProps {
  items?: SidebarProfileListItem[];
  isExpanded?: boolean;
}
const SidebarProfileSection = ({
  items = SidebarProfileList, // Fallback to SidebarProfileList
  isExpanded = false,
}: SidebarProfileSectionProps) => {
  items.map((item, index) => (
    <DropdownMenuItem key={`dropdown-${index}`}>
      <a href={item.url}>
        <div className="w-4 h-4 mr-2">{item.icon}</div>
        {isExpanded && <span>{item.title}</span>}
      </a>
    </DropdownMenuItem>
  ));
};
export default SidebarProfileSection;
