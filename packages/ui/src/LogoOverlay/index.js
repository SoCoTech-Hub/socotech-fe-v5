import { baseUrl } from "@/context/constants";

const LogoOverlay = () => {
  return (
    <img
      src={`${baseUrl}/logo.png`}
      alt="Logo"
      className="desktop:h-20 laptop:h-20 mobile:h-16"
    />
  );
};

export default LogoOverlay;
