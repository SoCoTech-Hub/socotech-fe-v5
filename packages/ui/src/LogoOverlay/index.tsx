import type { FC } from "react";

//TODO:fix import
export const LogoOverlay: FC = () => {
  return (
    <img
      src={`./logo.png`}
      alt="Logo"
      className="desktop:h-20 laptop:h-20 mobile:h-16"
    />
  );
};
