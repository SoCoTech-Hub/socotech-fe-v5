import { AvatarIcon } from "@/components/SvgIcons";
import { PrimaryColor } from "@/context/constants";

const Avatar = ({
  src,
  userName,
  message = false,
  border = false,
  borderColor = PrimaryColor,
  borderSize = "0.125rem",
  size = "2rem",
}) => {
  const Image = () => {
    return src ? (
      <img
        className={`rounded-full ${message ? "-mt-5" : ""}`}
        src={src}
        alt={`${userName ? `${userName}'s` : ""} Profile Picture`}
        style={{
          border: border ? `${borderSize} solid ${borderColor}` : "none",
          borderRadius: "50%",
          width: `${message ? "3rem" : size}`,
          height: `${message ? "3rem" : size}`,
          maxWidth: size,
          maxHeight: size,
          objectFit: "cover",
        }}
      />
    ) : (
      <AvatarIcon
        className={`rounded-full ${message ? "-mt-5" : ""}`}
        style={{
          border: border ? `${borderSize} solid ${borderColor}` : "none",
          borderRadius: "50%",
          width: size,
          maxWidth: size,
          height: size,
          maxHeight: size,
        }}
      />
    );
  };

  const UserName = () => {
    return userName ? (
      <div className="flex flex-row items-center">
        <Image />
        <span
          className={`mobile:text-xs font-medium ${
            message
              ? "text-textColor ml-2 text-sm"
              : "text-textColor text-md ml-3"
          }`}
        >
          {userName}
        </span>
      </div>
    ) : (
      <Image />
    );
  };

  return <UserName />;
};
export default Avatar;
