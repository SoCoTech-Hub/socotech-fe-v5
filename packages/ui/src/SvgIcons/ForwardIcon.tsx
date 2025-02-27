import type { JSX, SVGProps } from "react";

export const ForwardIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-supported-dps="24x24"
    className="fill-textColor"
    {...props}
  >
    <path d="m23 12-4.61 7H16l4-6H8a3.92 3.92 0 0 0-4 3.84V17a4 4 0 0 0 .19 1.24L5.12 21H3l-.73-2.22A6.4 6.4 0 0 1 2 16.94 6 6 0 0 1 8 11h12l-4-6h2.39z" />
  </svg>
);
