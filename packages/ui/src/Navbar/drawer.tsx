import { Separator } from "../separator";
import { drawerItems } from "./drawerItems";
import { MenuItem } from "./menuItem";
import { menuItems } from "./menuItems";

interface DrawerContentProps {
  activeLink: string;
  onClick: (href: string) => void;
}

export function DrawerContent({ activeLink, onClick }: DrawerContentProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="sm:visible lg:hidden">
        {menuItems.map((item) => (
          <MenuItem
            key={item.name}
            name={item.name}
            href={item.href}
            icon={item.icon}
            activeLink={activeLink}
            onClick={onClick}
          />
        ))}
        <Separator />
      </div>
      {drawerItems.map((item) => (
        <MenuItem
          key={item.name}
          name={item.name}
          icon={item.icon}
          items={item.items}
          activeLink={activeLink}
          onClick={onClick}
        />
      ))}
    </div>
  );
}
