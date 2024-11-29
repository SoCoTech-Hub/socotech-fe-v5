import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { baseUrl } from "@/context/constants";
import React from "react"

const Custom500: FC = () => {
  const router = useRouter();

  return (
    <>
      <div className="col row">
        <div className="gx-5 gy-4 space-y-10">
          <div className="grid justify-items-center">
            <div className="error-font text-themeColorMain font-bold">500</div>
            <div className="text-textColor font-bold">
              Oops! Something went wrong, we are working on it and will be back
              soon.
            </div>
            <div className="mb-5 mt-3">
              <a
                onClick={() => router.back()}
                className="d-inline-block bg-themeColorMain w-64 cursor-pointer rounded-full py-2 text-center font-bold text-black"
              >
                Back to Home
              </a>
            </div>
            <div className="flex w-full justify-center">
              <Image
                src={`${baseUrl}/page500.png`}
                alt="Error 500"
                width={502}
                height={474}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom500;
