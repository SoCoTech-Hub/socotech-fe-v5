import type { FC } from "react";
import { baseUrl } from "@/context/constants";
//TODO:fix import
const LogoOverlay: FC = () => {
  return (
    <img
      src={`${baseUrl}/logo.png`}
      alt="Logo"
      className="desktop:h-20 laptop:h-20 mobile:h-16"
    />
  );
};

export default LogoOverlay;
