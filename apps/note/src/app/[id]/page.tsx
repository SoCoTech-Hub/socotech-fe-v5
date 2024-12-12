import React from "react";

import NoteEditor from "@acme/ui/Notes/editor";

const seo = {
  title: "Note Display",
  description: "Optimize your notes with Topic!",
};
const notesdisplay = ({ subjects, note, profileId }) => (
  <div className="desktop:mb-4 laptop:mb-4 mobile:mb-10 col row">
    <div className="desktop:gx-5 desktop:gy-4 mobile:space-y-3 space-y-10">
      {note ? (
        <NoteEditor
          subjects={subjects}
          profileId={profileId}
          note={note}
          edit={true}
        />
      ) : (
        <NoteEditor subjects={subjects} profileId={profileId} edit={true} />
      )}
    </div>
  </div>
);

export default notesdisplay;
