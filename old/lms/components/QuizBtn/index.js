import React from "react"
import { baseUrl } from "@/context/constants"

const QuizBtn = ({ next, addedClasses, clickFunc }) => {
  return (
    <div>
      {next ? (
        <button
          onClick={clickFunc}
          aria-label="nextArrow"
          className={`p-2 rounded-full bg-themeColorMain hover:bg-themeColorSecondary ${addedClasses}`}>
          <img src={`${baseUrl}/next_arrow.svg`} alt="" className="w-5 " fill="black" />
        </button>
      ) : (
        <button
          onClick={clickFunc}
          aria-label="previousArrow"
          className={`p-2 rounded-full bg-themeColorMain hover:bg-themeColorSecondary ${addedClasses}`}>
          <img src={`${baseUrl}/previous_arrow.svg`} alt="" className="w-5 " />
        </button>
      )}
    </div>
  )
}

export default QuizBtn
