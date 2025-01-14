import React from "react";

import { NoteEditor } from "@acme/ui";

const createnote = ({ subjects, profileId }) => {
  return (
    <div className="desktop:mb-4 laptop:mb-4 mobile:mb-10 col row">
      <div className="desktop:gx-5 desktop:gy-4 mobile:space-y-3 space-y-10">
        <NoteEditor />
      </div>
    </div>
  );
};

export default createnote;
