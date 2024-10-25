import LogoOverlay from "@/components/LogoOverlay";
import { baseUrl } from "@/context/constants";

export default function TwoColPage({ col1Image, header, col2 }) {
  return (
    <>
      <div className="g-0 flex flex-wrap overflow-x-hidden">
        <div className="desktop:w-1/2 laptop:w-1/2 mobile:h-1/3 w-full">
          <div className="desktop:h-screen laptop:h-screen flex w-full place-content-center items-center">
            <img
              src={col1Image ? col1Image : `${baseUrl}/brand-image.png`}
              alt="Image"
              className="mobile:hidden"
            />
          </div>
        </div>
        <div className="bg-compBg desktop:w-1/2 laptop:w-1/2 mobile:h-2/3 w-full">
          <div className="desktop:h-screen laptop:h-screen mobile:mx-1 mobile:-mt-4 flex w-full place-content-center items-center">
            <div className="desktop:w-3/5 mobile:w-10/12 desktop:my-0 laptop:w-3/5 my-10">
              <div className="mobile:pt-2 text-textHeading w-4/5 pt-16 text-3xl font-bold">
                <LogoOverlay />
                <div className="pt-4">{header}</div>
              </div>
              {col2}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
