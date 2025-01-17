import React from "react";

import { ApplicationsListing, WelcomeBanner } from "@acme/ui";

//TODO: snippets
export default function Home() {
  return (
    <div>
      <div>
        <div className="desktop:p-4 laptop:p-4 mobile:p-1 card bg-themeColorMain w-full">
          <WelcomeBanner
            title={`Welcome to ${university.name}`}
            subheading="Discover all the opportunities our university offers."
            backgroundClass="bg-gradient-to-r from-green-500 to-blue-600"
            buttonText="Learn More"
            onClick={() => console.log("Learn More clicked")}
            gifSrc="/images/welcome-banner.gif"
            gifAlt="University animation"
          />
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
