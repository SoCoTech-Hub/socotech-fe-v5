// use Loader
import React from "react";
import { baseUrl } from "@/context/constants";

const SplashScreen: React.FC = () => {
  return (
    <div
      id="splashScreen"
      className="bg-appBg flex h-screen items-center justify-center"
    >
      <img
        src={`${baseUrl}/animations/loading.gif`}
        className="w-11/12"
        alt="Loading"
      />
    </div>
  );
};

export default SplashScreen;
