import Link from "next/link";

const BtnBig = ({
  label = "Save",
  link = "",
  onClick,
  color = "bg-current",
  textSize = "text-lg",
  trackingAction = "",
  textColor = "text-textColor",
  borderColor = "border-none",
  width = "w-60",
  disabled = false,
}) => {
  return (
    <div className="px-1">
      {link ? (
        <Link href={link} passHref>
          <button
            data-tracking-action={trackingAction}
            className={`${color} border-2 text-center ${textColor} ${borderColor} rounded-md p-3 ${width} ${textSize}`}
          >
            {label}
          </button>
        </Link>
      ) : (
        <button
          type="button"
          disabled={disabled}
          data-tracking-action={trackingAction}
          className={`${color} border-2 text-center ${textColor} ${borderColor} rounded-md p-3 ${width} ${textSize}`}
          onClick={onClick}
        >
          {label}
        </button>
      )}
    </div>
  );
};

export default BtnBig;