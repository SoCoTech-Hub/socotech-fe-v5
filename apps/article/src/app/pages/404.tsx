import { FC } from "react";
import { useRouter } from "next/router";
// import styles from '@/styles/error.module.css';
import { baseUrl } from "@/context/constants";
import React from "react"

const Custom404: FC = () => {
  const router = useRouter();

  return (
    <>
      {/* <img
        src={`${baseUrl}/logo.png`}
        alt='Logo'
        className='logo-overlay desktop:h-24 laptop:h-20 mobile:h-12'
      /> */}

      <div className="flex h-screen flex-col items-center justify-center space-y-10">
        <div className="grid justify-items-center">
          <div className="flex flex-col items-center justify-center">
            <img
              src={`${baseUrl}/page404.gif`}
              alt="Error 404"
              className="w-full max-w-xl"
            />
          </div>
          <div className="text-textColor font-bold">
            Oops! This page does not exist
          </div>
          <div className="my-4">
            <a
              onClick={() => router.push("/")}
              className="d-inline-block bg-themeColorMain w-64 cursor-pointer rounded-full py-2 text-center font-bold text-black"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom404;
