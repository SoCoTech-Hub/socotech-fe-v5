// import { useAppContext } from "@/context/AppContext"
// import { PrimaryColor } from "@/context/constants"

const MainMenuButton = ({
  icon,
  color = "",
  title = "Item",
  description,
  doWhat,
  badgeCount,
  // iconColor,
  textColor,
  mobile,
}) => {
  // const { state } = useAppContext()
  return (
    <div
      className="mobile:bg-compBg mobile:px-3 w-full cursor-pointer rounded-lg hover:shadow-md"
      onClick={doWhat}
    >
      <div className="mobile:pb-2 flex w-full items-center justify-between align-middle">
        {mobile ? (
          <div className="flex flex-wrap items-center px-3">
            <div className={`mobile:w-12 rounded-lg p-2 ${color}`}>
              <div
                className="text-themeColorMain mx-auto my-auto"
                // style={{ color: iconColor }}
              >
                {icon}
              </div>
            </div>
            <div className="">
              <div className={`text-textColor ${textColor}`}>{title}</div>
            </div>
          </div>
        ) : (
          <div className="align-items-center mobile:gap-2 flex align-middle">
            <div
              className={`desktop:w-12 desktop:h-12 laptop:h-10 laptop:w-10 mobile:w-10 mobile:h-12 rounded-lg p-2 ${color}`}
            >
              <div
                className="text-themeColorMain mx-auto my-auto"
                // style={{ color: iconColor }}
              >
                {icon}
              </div>
            </div>
            <div className="item ml-2">
              <div className={`text-textColor ${textColor}`}>{title}</div>
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
            // PrimaryColor,
            // }}
          >
            {badgeCount}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MainMenuButton;
