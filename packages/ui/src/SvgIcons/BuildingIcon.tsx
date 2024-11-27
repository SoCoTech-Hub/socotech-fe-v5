import type { JSX, SVGProps } from "react";
import React from "react";

export const BuildingIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-supported-dps="24x24"
    className="fill-textColor"
    {...props}
  >
    <path d="M4 2v20h16V2zm14 18h-4v-2h-4v2H6V4h12zm-7-8H8v-2h3zm0 4H8v-2h3zm5-4h-3v-2h3zm-5-4H8V6h3zm5 0h-3V6h3zm0 8h-3v-2h3z" />
  </svg>
);
