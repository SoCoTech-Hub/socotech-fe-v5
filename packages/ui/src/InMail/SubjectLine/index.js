import React from "react"
import FolderChip from "@/components/InMailFolderChip"

const SubjectLine = ({ subject }) => {
  return (
    <div>
      <div className="flex items-center justify-between align-middle">
        <div className="flex items-center justify-start align-middle">
          <div className="text-xl font-medium">{subject}</div>
          <FolderChip label="Inbox" />
        </div>
        {/* <div className="flex gap-3">
            <img
              src="/inmail/inmail_updown.svg"
              alt="?"
              className="w-6 cursor-pointer"
            />
            <img
              src="/inmail/inmail_print.svg"
              alt="Print"
              className="w-6 cursor-pointer"
            />
            <img
              src="/inmail/inmail_newwindow.svg"
              alt="New Window"
              className="w-6 cursor-pointer"
            />
        </div> */}
      </div>
    </div>
  )
}

export default SubjectLine
