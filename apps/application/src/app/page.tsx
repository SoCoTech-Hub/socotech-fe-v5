import React from "react";

import { ApplicationsListing } from "@acme/ui/Applications/listing";
import WelcomeBanner from "@acme/ui/applications/tour";

//TODO: snippets
export default function Home() {
  return (
    <div>
      <div>
        <div className="desktop:p-4 laptop:p-4 mobile:p-1 card bg-themeColorMain w-full">
          <WelcomeBanner tourImage="" />
          {/* //TODO:add image */}
        </div>

        <div className="mobile:grid-cols-2 my-4 grid grid-cols-5 place-items-stretch gap-3">
          {/* //TODO:fix */}
          {faculties?.map((faculty) => (
            <ApplicationsListing setSelection={""} />
          ))}
        </div>
      </div>
    </div>
  );
}
