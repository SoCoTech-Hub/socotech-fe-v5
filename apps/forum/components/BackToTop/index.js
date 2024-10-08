import { useEffect, useState } from "react"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import { PrimaryColor } from "@/context/constants"

const index = () => {
  const [showButton, setShowButton] = useState(false)
  const scroller = document.getElementById("scrollplz")

  const toggleVisibility = () => {
    if (scroller?.scrollTop > 10) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }

  useEffect(() => {
    scroller?.addEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    scroller.scrollTo({
      top: 0,
      behavior: "smooth",
    })
    setShowButton(false)
  }
  return (
    <>
      {showButton ? (
        <div
          onClick={scrollToTop}
          className="absolute flex justify-center p-3 align-middle rounded-full cursor-pointer text-textColor w-14 h-14 shadow-menu"
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
  )
}

export default index
