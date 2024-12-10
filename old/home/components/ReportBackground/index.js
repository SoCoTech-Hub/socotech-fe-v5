import React from "react"

const index = ({ children }) => {
  return (
    <div className="m-2 bg-reportBg rounded-lg">
      <div className="px-3 py-4">{children}</div>
    </div>
  )
}

export default index
