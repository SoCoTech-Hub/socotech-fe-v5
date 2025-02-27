import type { JSX, SVGProps } from "react";

export const ChevDown = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) => (
  <svg
    x={0}
    y={0}
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    data-testid="ExpandMoreIcon"
    {...props}
  >
    <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
  </svg>
);
