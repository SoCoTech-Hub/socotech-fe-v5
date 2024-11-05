import React from "react"

const TabContainer = ({ children, containerRole = "tablist" }) => {
  return (
    <div>
      <ul
        className="flex flex-row w-full pt-3 desktop:pb-4 laptop:pb-4 mobile:pb-1 mb-0 overflow-scroll list-none no-scrolly"
        role={containerRole}>
        {children}
      </ul>
    </div>
  )
}

export default TabContainer
