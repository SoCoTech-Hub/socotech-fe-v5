import type { ReactNode } from "react";

import type { AuthNavbarProps } from "../AuthNavbar";
import { AuthNavbar } from "../AuthNavbar";

export interface AuthPageProps {
  bgImage?: string;
  bgColor?: string;
  bgSize?: string;
  leftTitle?: ReactNode;
  content?: ReactNode;
  contentBgColor?: string;
  hasNavbar?: boolean;
  customNavbar?: ReactNode;
  authNavbar?: AuthNavbarProps;
  className?: string;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  bgImage,
  bgColor = "inherit",
  bgSize = "cover",
  leftTitle,
  content,
  contentBgColor = "inherit",
  hasNavbar = true,
  customNavbar,
  authNavbar,
  className,
}) => {
  return (
    <>
      {hasNavbar &&
        (customNavbar
          ? customNavbar
          : authNavbar && (
              <div className="fixed z-[999] w-full">
                <AuthNavbar {...authNavbar} />
              </div>
            ))}
      <div
        className={`flex h-screen w-full ${
          className ?? ""
        } desktop:flex-row laptop:flex-row mobile:flex-col`}
      >
        <div
          className={`mobile:hidden flex h-auto w-1/2 items-center justify-center ${
            bgImage ? "" : "bg-none"
          }`}
          style={{
            backgroundImage: bgImage ? `url(${bgImage})` : undefined,
            backgroundColor: bgColor,
            backgroundPosition: "center",
            backgroundSize: bgSize,
          }}
          aria-hidden={leftTitle ? "false" : "true"}
        >
          {leftTitle}
        </div>
        <div
          className="mobile:w-full flex h-auto w-1/2 items-start justify-center overflow-y-scroll"
          style={{ backgroundColor: contentBgColor }}
        >
          {content}
        </div>
      </div>
    </>
  );
};
