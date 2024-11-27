import React from "react";

export interface SidebarProfileProps {
  isExpanded: boolean;
  avatarSrc: string;
  name: string;
  email: string;
}
const SidebarProfile = (props: SidebarProfileProps) => (
  <div className="flex w-10 items-center">
    <img
      src={props.avatarSrc}
      alt="User avatar"
      className="mr-2 rounded-full"
    />
    {props.isExpanded && (
      <div className="text-left">
        <p className="font-medium text-gray-900">{props.name}</p>
        <p className="text-sm text-gray-500">{props.email}</p>
      </div>
    )}
  </div>
);
export default SidebarProfile;
