import AuthNavbar from "@/components/AuthNavbar";

const AuthPage = ({
  bgImage,
  bgColor,
  bgSize,
  leftTitle,
  content,
  contentBgColor,
  hasNavbar,
  customNavbar,
}) => {
  return (
    <>
      {hasNavbar ? (
        customNavbar ? (
          customNavbar
        ) : (
          <div
            className="fixed w-full"
            style={{
              zIndex: "999",
            }}
          >
            <AuthNavbar />
          </div>
        )
      ) : (
        <></>
      )}
      <div
        className="desktop:flex-row laptop:flex-row mobile:flex-col flex h-screen w-full"
        style={{ zIndex: "1" }}
      >
        <div
          style={{
            backgroundImage: `${bgImage ? `url(${bgImage})` : "none"}`,
            backgroundRepeat: "no-repeat",
            backgroundColor: `${bgColor ? bgColor : "inherit"}`,
            backgroundPosition: "center",
            backgroundSize: `${bgSize ? bgSize : "cover"}`,
            height: "110vh",
            userSelect: "none",
            msUserSelect: "none",
            MozUserSelect: "none",
            WebkitUserSelect: "none",
          }}
          className="mobile:hidden flex h-auto w-1/2 items-center justify-center"
        >
          {leftTitle ? leftTitle : <></>}
        </div>
        <div
          className="mobile:w-full flex h-auto w-1/2 items-start justify-center overflow-y-scroll"
          style={{
            backgroundColor: `${contentBgColor ? contentBgColor : "inherit"}`,
          }}
        >
          {content ? content : <></>}
        </div>
      </div>
    </>
  );
};

export default AuthPage;
