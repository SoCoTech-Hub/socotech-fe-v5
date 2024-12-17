import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { MenuItems } from "./menuItems";

export interface UserMenuProps {
  name: string;
  email: string;
  image?: string;
}

function UserMenu(props: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={props.image} alt={props.name} />
            <AvatarFallback>{props.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{props.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {props.email}
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {MenuItems.map((item, index) =>
          item.isSeparator ? (
            <DropdownMenuSeparator key={index} />
          ) : (
            <DropdownMenuItem asChild key={index}>
              <a href={item.href}>{item.title}</a>
            </DropdownMenuItem>
          ),
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default UserMenu;
