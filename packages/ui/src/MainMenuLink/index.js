import { useRouter } from "next/router";
import { baseUrl } from "@/context/constants";

// import { useAppContext } from "@/context/AppContext"
// import { PrimaryColor } from "@/context/constants"

const MainMenuLink = ({
  icon,
  color = "",
  title = "Item",
  link = null,
  description,
  doWhat,
  badgeCount,
  // iconColor,
  textColor,
  mobile,
  dataTour,
}) => {
  // const { state } = useAppContext()
  const router = useRouter();
  const pathname = router.pathname;
  const url =
    pathname == "/"
      ? process.env.NEXT_PUBLIC_BASE_URL
      : process.env.NEXT_PUBLIC_BASE_URL + pathname;

  const Icon = () => icon;
  return (
    <div
      id="text-decoration"
      className={`w-full cursor-pointer rounded-lg hover:shadow-md`}
      data-tour={dataTour}
    >
      <a onClick={doWhat} href={link}>
        <div
          className={`mobile:pb-2 mobile:bg-compBg mobile:px-3 mt-2 flex w-full items-center justify-between rounded-lg align-middle ${
            link == url ? `${color}` : ""
          }`}
        >
          {mobile ? (
            <div className="flex flex-wrap items-center px-3">
              <div
                className={`mobile:w-12 mobile:h-12 rounded-lg p-2 ${color}`}
              >
                <div
                  className="mx-auto my-auto"
                  // style={{ color: iconColor }}
                >
                  <Icon />
                </div>
              </div>
              <div className="">
                <div
                  className={`${link == url ? textColor : "text-textColor"}`}
                >
                  {title}
                </div>
              </div>
            </div>
          ) : (
            <div className="align-items-center group flex align-middle">
              <div
                className={`desktop:w-12 desktop:h-12 laptop:h-10 laptop:w-10 mobile:w-12 mobile:h-12 group-hover:bg-themeColorMain rounded-full p-0.5 ${color}`}
              >
                <div className="">
                  <Icon />
                </div>
              </div>
              <div className="item ml-2">
                <div
                  className={`${textColor} group-hover:decoration-themeColorMain text-sm group-hover:decoration-solid group-hover:underline-offset-2`}
                >
                  {title}
                </div>
                {description ? (
                  <div className={`paragraph text-textColor ${textColor}`}>
                    {description}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}

          {badgeCount ? (
            <div
              className="bg-themeColorMain flex h-8 w-8 items-center justify-center rounded-lg align-middle font-bold text-black"
              // style={{
              //   backgroundColor:
              //     PrimaryColor
              // }}
            >
              {badgeCount}
            </div>
          ) : (
            ""
          )}
        </div>
      </a>
    </div>
  );
};

export default MainMenuLink;
