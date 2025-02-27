import type { JSX, SVGProps } from "react";

export const LightbulbIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    data-supported-dps="24x24"
    className="fill-textColor"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M10 20h4v.1a1.9 1.9 0 0 1-1.9 1.9h-.2a1.9 1.9 0 0 1-1.9-1.9zm4.68-14.47A1 1 0 0 0 16 5l.76-1.85a1 1 0 0 0-.54-1.3 1 1 0 0 0-1.31.54l-.76 1.85a1 1 0 0 0 .53 1.29zm5.09 4.33 1.85-.76a1 1 0 0 0 .54-1.31 1 1 0 0 0-1.3-.54L19 8a1 1 0 0 0-.54 1.31 1 1 0 0 0 1.3.55zM4.23 14.14l-1.85.76a1 1 0 0 0-.54 1.31 1 1 0 0 0 1.3.54L5 16a1 1 0 0 0 .54-1.31 1 1 0 0 0-1.3-.55zm17.39.76-1.85-.76A1 1 0 0 0 19 16l1.85.76a1 1 0 0 0 .78-1.86zM5 8l-1.86-.75a1 1 0 0 0-1.3.54 1 1 0 0 0 .54 1.31l1.85.76A1 1 0 0 0 5 8zm3-3a1 1 0 0 0 1.31.54 1 1 0 0 0 .54-1.3L9.1 2.38a1 1 0 0 0-1.31-.54 1 1 0 0 0-.54 1.3zm9 6.91V12a5.48 5.48 0 0 1-1.61 3.88l-.07.08a3.94 3.94 0 0 0-1.08 1.94L14 19h-4l-.24-1.08A4 4 0 0 0 8.68 16l-.07-.07A5.51 5.51 0 0 1 7 12v-.1A4.9 4.9 0 0 1 11.9 7h.2a4.9 4.9 0 0 1 4.9 4.9zm-2 0A2.9 2.9 0 0 0 12.11 9h-.21A2.9 2.9 0 0 0 9 11.9v.1a3.47 3.47 0 0 0 1 2.47l.08.08a5.92 5.92 0 0 1 1.5 2.45h.84a6 6 0 0 1 1.48-2.44l.08-.07A3.48 3.48 0 0 0 15 12z" />
  </svg>
);
