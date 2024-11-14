import type { ReactNode } from "react";

import { DropdownMenuItem } from "../dropdown-menu";

export interface SidebarProfileSectionProps {
  items: { icon: ReactNode; name: string; href: string }[];
  isExpanded: boolean;
}
const SidebarProfileSection = (props: SidebarProfileSectionProps) =>
  props.items.map((item, index) => (
    <DropdownMenuItem key={`dropdown-${index}`}>
      <a href={item.href}>
        <div className="mr-2 h-4 w-4">{item.icon}</div>
        {props.isExpanded && <span>{item.name}</span>}
      </a>
    </DropdownMenuItem>
  ));
export default SidebarProfileSection;
