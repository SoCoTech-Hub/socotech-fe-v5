import type { JSX, SVGProps } from "react";

export const ImNewMailIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" {...props}>
      <path
        d="M22.64 6.09h-18c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1v-14c0-.55-.44-1-1-1z"
        fill="#9ba4b4"
      />
      <path
        d="M10.35 16.8l-2 2c-.4.38-1.03.37-1.41-.02-.37-.39-.37-1 0-1.39l2-2c.4-.38 1.03-.37 1.41.02.38.39.38 1 0 1.39zm10 2a.996.996 0 01-1.41 0l-2-2c-.38-.4-.37-1.03.02-1.41.39-.37 1-.37 1.39 0l2 2c.39.39.39 1.02 0 1.41zm.79-7.84l-7 4c-.31.18-.68.18-.99 0l-7-4c-.49-.26-.67-.87-.4-1.36s.87-.66 1.35-.4c.01.01.03.02.04.02l6.5 3.72 6.5-3.72c.48-.28 1.09-.11 1.37.37s.11 1.09-.37 1.37z"
        fill="#4a5b7b"
      />
    </svg>
  );
};
