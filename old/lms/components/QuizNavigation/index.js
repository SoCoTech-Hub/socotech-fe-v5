import React from "react";
import Link from "next/link";
import { LmsButtonLeft, LmsButtonRight } from "../SvgIcons";

const index = () => {
  return (
    <div className="flex justify-between mb-8">
      <Link href={"#"} passHref>
        <div className="">
          <LmsButtonLeft className="w-10 h-10 mt-2 cursor-pointer" />
        </div>
      </Link>
      <Link href={"#"} passHref>
        <div className="">
          <LmsButtonRight className="w-10 h-10 mt-2 cursor-pointer" />
        </div>
      </Link>
    </div>
  );
};

export default index;
