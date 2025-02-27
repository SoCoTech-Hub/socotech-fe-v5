import React from "react";
import Link from "next/link";

import { baseUrl } from "@acme/snippets/context/constants";
import { Button, HLSVideoPlayer, NoteEditor } from "@acme/ui";

const CategoryDisplay: React.FC<CategoryDisplayProps> = ({ show }) => {
  return (
    <div className="col row">
      <div>
        {show?.url ? (
          <HLSVideoPlayer />
        ) : (
          <img src={`${baseUrl}/Shows_ComingSoon.png`} alt="Coming Soon" />
        )}
      </div>
      <div className={`flex flex-row flex-wrap justify-between gap-2 p-4`}>
        <Button
          onClick={handleClickOpen} //TODO:write function
          className={`bg-primary ${show?.url ? "" : "hidden"}`}
        >
          Take notes
        </Button>
        <Link scroll={false} href={`/shows/category/${show?.showCategory?.id}`}>
          <Button className="bg-primary">Back to Shows</Button>
        </Link>

        <NoteEditor />
      </div>
    </div>
  );
};

export default CategoryDisplay;
