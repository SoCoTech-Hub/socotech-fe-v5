import { useEffect, useState } from "react";
import { PrimaryColor } from "@/context/constants";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const index = () => {
  const [showButton, setShowButton] = useState(false);
  const scroller = document.getElementById("scrollplz");

  const toggleVisibility = () => {
    if (scroller?.scrollTop > 10) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    scroller?.addEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    scroller.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setShowButton(false);
  };
  return (
    <>
      {showButton ? (
        <div
          onClick={scrollToTop}
          className="text-textColor absolute flex h-14 w-14 cursor-pointer justify-center rounded-full p-3 align-middle shadow-md"
          style={{
            bottom: 50,
            right: 300,
            background: PrimaryColor,
          }}
        >
          <ArrowUpwardIcon size="large" />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default index;
