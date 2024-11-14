import { Button } from "../button";

export interface SidebarProfileProps {
  isExpanded: boolean;
  avatarSrc: string;
  name: string;
  email: string;
}
const SidebarProfile = (props: SidebarProfileProps) => (
  <Button variant="ghost" className="w-full justify-start">
    <div className="flex items-center">
      <img
        src={props.avatarSrc}
        alt="User avatar"
        className="mr-2 h-8 w-8 rounded-full"
      />
      {props.isExpanded && (
        <div className="text-left">
          <p className="font-medium">{props.name}</p>
          <p className="text-sm text-gray-500">{props.email}</p>
        </div>
      )}
    </div>
  </Button>
);
export default SidebarProfile;
