import React from "react"
{ useState } from "react"
import {Button} from "@acme/ui/Button";
import HLSVideoPlayer from "@acme/ui/HLSVideoPlayer";
import { baseUrl} from "@acme/snippets/context/constants";
import {NoteEditor} from "@acme/ui/Notes/Editor";




const CategoryDisplay: React.FC<CategoryDisplayProps> = ({ show }) => {

  return (
    <div className="col row">
      <div>
        {show?.url ? (
          <HLSVideoPlayer/>
        ) : (
          <img src={`${baseUrl}/Shows_ComingSoon.png`} alt="Coming Soon" />
        )}
      </div>
      <div className={`flex flex-row flex-wrap justify-between gap-2 p-4`}>
        <Button
          label="Take notes"
          onClickFunction={handleClickOpen}
          color={`bg-themeColorMain ${show?.url ? "" : "hidden"}`}
        />

        <Button
          label="Back to Shows"
          link={`/shows/category/${show?.showCategory?.id}`}
          color="bg-themeColorMain"
        />

        <NoteEditor/>
      </div>
    </div>
  );
};

export default CategoryDisplay;
