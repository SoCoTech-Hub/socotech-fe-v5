import type { JSX, SVGProps } from "react";

export const Close = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) => (
  <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 27 27"
    className="w-full h-full"
    {...props}
  >
    <circle cx="13.5" cy="13.5" r="13.5" className="fill-themeColorMain" />
    <path
      className="fill-themeColorSecondary"
      d="M8.76,18.28,12,13.43,8.9,8.72H12l1.6,2.77,1.56-2.77h3L15,13.39l3.27,4.9H15.11l-1.65-2.88-1.67,2.88h-3Z"
    />
  </svg>
);
