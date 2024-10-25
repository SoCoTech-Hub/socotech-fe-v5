import React from "react";
import Link from "next/link";

// Define the prop types
interface BtnProps {
  label?: string;
  link?: string | null;
  onClickFunction?: () => void;
  disable?: boolean;
  color?: string;
  textSize?: string;
  fontWeight?: string;
  trackingAction?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
  btnWidth?: string;
}

const Btn: React.FC<BtnProps> = ({
  label = "Save",
  link = null,
  onClickFunction,
  disable = false,
  color = "current",
  textSize = "text-xs",
  fontWeight = "",
  trackingAction = "",
  target = "_self",
  btnWidth = `w-full`,
}) => {
  const font = `font-${fontWeight}`;

  if (disable) {
    return (
      <div className="w-30 cursor-pointer px-1">
        <button
          data-tracking-action={trackingAction}
          disabled={disable}
          className={`${color} rounded-md px-4 py-2 text-center text-white ${btnWidth} ${textSize} ${font}`}
        >
          {label}
        </button>
      </div>
    );
  }

  if (!link) {
    return (
      <div className="w-30 cursor-pointer px-1">
        <button
          data-tracking-action={trackingAction}
          className={`${color} rounded-md px-4 py-2 text-center text-white ${btnWidth} ${textSize} ${font}`}
          onClick={onClickFunction}
        >
          {label}
        </button>
      </div>
    );
  }

  return (
    <div className="w-30 px-1" data-tracking-action={trackingAction}>
      {link.startsWith("http") ? (
        <a
          href={link}
          target={target}
          rel="noreferrer"
          className={`${color} cursor-pointer rounded-md px-4 py-2 text-center text-white ${btnWidth} ${textSize} ${font}`}
        >
          {label}
        </a>
      ) : (
        <Link href={link} passHref>
          <div
            className={`${color} cursor-pointer rounded-md px-4 py-2 text-center text-white ${btnWidth} ${textSize} ${font}`}
          >
            {label}
          </div>
        </Link>
      )}
    </div>
  );
};

export default Btn;
