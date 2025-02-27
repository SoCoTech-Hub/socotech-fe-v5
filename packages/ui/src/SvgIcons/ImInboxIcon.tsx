import type { JSX, SVGProps } from "react";

export const ImInboxIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" {...props}>
      <path
        d="M6.64 23.09h14c1.1 0 2-.9 2-2v-13c0-1.66-1.34-3-3-3h-12c-1.66 0-3 1.34-3 3v13a2 2 0 002 2z"
        fill="#4a5b7b"
      />
      <path
        d="M6.64 8.09c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v5.5c0 .28-.22.5-.5.5h-3.03a.495.495 0 00-.5.41 2.997 2.997 0 01-5.94 0 .505.505 0 00-.5-.41H7.14c-.28 0-.5-.22-.5-.5v-5.5z"
        fill="#9ba4b4"
      />
    </svg>
  );
};
