import type { JSX, SVGProps } from "react";

export const ImSentIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" {...props}>
      <path
        d="M13.65 23.72c1.7 0 3.37-.49 4.8-1.4l4.2 1.4-1.4-4.2c2.65-4.2 1.39-9.76-2.82-12.4S8.68 5.73 6.03 9.93s-1.39 9.76 2.82 12.4c1.44.91 3.1 1.39 4.8 1.39z"
        fill="#9ba4b4"
      />
      <path
        d="M9.65 11.22h8c.55 0 1 .45 1 1s-.45 1-1 1h-8c-.55 0-1-.45-1-1s.45-1 1-1zm0 5h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1 0-.56.45-1 1-1z"
        fill="#4a5b7b"
      />
    </svg>
  );
};
