import React from "react";
import Head from "next/head";
import Link from "next/link";

const Cancel: React.FC = () => (
  <>
    <Head>
      <title>Redirect</title>
      <meta name="description" content="redirecting you" />
    </Head>
    <img
      src="/logo.png"
      alt="Logo"
      className="logo-overlay desktop:h-24 laptop:h-20 mobile:h-12"
    />
    <div className="flex h-screen w-full place-content-center items-center">
      <div className="w-2/3">
        <div className="flex w-full flex-wrap justify-center">
          <div className="text-mainColor404 desktop:text-8xl mobile:text-5xl w-full break-words py-2 text-center font-bold">
            Payment Failed
          </div>
          <div className="mb-3 mt-3 flex justify-center py-2">
            <Link href="./create">
              <a className="text-textColor d-inline-block bg-themeColorMain w-64 cursor-pointer rounded-full py-2 text-center font-bold">
                Try Again
              </a>
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="/page404.png"
            alt="Redirecting"
            className="desktop:py-0 w-5/6"
          />
        </div>
      </div>
    </div>
  </>
);

export default Cancel;
