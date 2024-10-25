import React, { ReactNode } from "react";
import AuthNavbar from "@/components/AuthNavbar";

// Define the prop types
interface AuthPageProps {
  bgImage?: string;
  bgColor?: string;
  bgSize?: string;
  leftTitle?: ReactNode;
  content?: ReactNode;
  contentBgColor?: string;
  hasNavbar?: boolean;
  customNavbar?: ReactNode;
}

const AuthPage: React.FC<AuthPageProps> = ({
  bgImage,
  bgColor,
  bgSize,
  leftTitle,
  content,
  contentBgColor,
  hasNavbar = true, // You can set default values for props like this
  customNavbar,
}) => {
  return (
    <>
      {hasNavbar ? (
        customNavbar ? (
          customNavbar
        ) : (
          <div
            className="fixed w-full"
            style={{
              zIndex: "999",
            }}
          >
            <AuthNavbar />
          </div>
        )
      ) : null}
      <div
        className="desktop:flex-row laptop:flex-row mobile:flex-col flex h-screen w-full"
        style={{ zIndex: "1" }}
      >
        <div
          style={{
            backgroundImage: bgImage ? `url(${bgImage})` : "none",
            backgroundRepeat: "no-repeat",
            backgroundColor: bgColor ?? "inherit",
            backgroundPosition: "center",
            backgroundSize: bgSize ?? "cover",
            height: "110vh",
            userSelect: "none",
            msUserSelect: "none",
            MozUserSelect: "none",
            WebkitUserSelect: "none",
          }}
          className="mobile:hidden flex h-auto w-1/2 items-center justify-center"
        >
          {leftTitle ?? null}
        </div>
        <div
          className="mobile:w-full flex h-auto w-1/2 items-start justify-center overflow-y-scroll"
          style={{
            backgroundColor: contentBgColor ?? "inherit",
          }}
        >
          {content ?? null}
        </div>
      </div>
    </>
  );
};

export default AuthPage;
