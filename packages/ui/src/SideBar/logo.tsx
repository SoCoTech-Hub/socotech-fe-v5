import React from "react";

export interface SidebarLogoProps {
  url?: string;
  altUrl?: string;
}
const SidebarLogo = (props: SidebarLogoProps) => (
  <img src={props.url ?? props.altUrl} />
);
export default SidebarLogo;
