import type { JSX, SVGProps } from "react";

export const ImTrashIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" {...props}>
      <path
        d="M21.64 12.09h-16v11c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-11z"
        className="fill-themeColorMain"
      />
      <path
        className="fill-themeColorSecondary"
        d="M10.64 20.09c0 .55-.45 1-1 1s-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4zm4 0c0 .55-.45 1-1 1s-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4zm4 0c0 .55-.45 1-1 1s-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4zm5-13v3h-20v-3c0-.55.45-1 1-1h5v-1c0-.55.45-1 1-1h6c.55 0 1 .45 1 1v1h5c.56 0 1 .45 1 1z"
      />
    </svg>
  );
};
