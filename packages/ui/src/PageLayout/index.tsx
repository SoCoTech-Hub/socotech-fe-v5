import type { FC, ReactNode } from "react";
import { baseUrl } from "@/context/constants";

import { Alert } from "../alert";
import LogoOverlay from "../LogoOverlay";

//TODO: Fix
export interface PageProps {
  header: string;
  message: string;
  buttons: ReactNode[];
  background?: string;
  error?: string;
  success?: string;
}

export const Page: FC<PageProps> = ({
  header,
  message,
  buttons,
  background,
  error,
  success,
}) => (
  <div className="flex h-screen w-full items-center justify-center">
    <div
      className="flex h-full w-full items-center justify-center"
      style={{
        backgroundImage: `url(${background ?? `${baseUrl}/background1.png`})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-compBg mobile:w-11/12 laptop:w-1/2 desktop:w-1/2 mobile:p-4 laptop:px-20 laptop:py-8 mobile:my-5 laptop:my-10 flex flex-col gap-y-4 rounded-3xl drop-shadow-2xl filter">
        <div className="mt-4 flex justify-center">
          <LogoOverlay />
        </div>
        <div className="text-textColor text-center text-2xl font-bold">
          {header}
        </div>
        <div className="text-themeColorSecondary w-full px-4 text-center">
          {message}
        </div>
        <div className="desktop:px-20 laptop:px-20 mobile:px-2">
          <Alert error={error} success={success} />
        </div>
        <div className="mb-4 flex flex-wrap justify-center gap-4">
          {buttons.map((button, index) => (
            <div key={index}>{button}</div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Page;
