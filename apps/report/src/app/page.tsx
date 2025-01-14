import React from "react";

import { ReportListing } from "@acme/ui";
import { ReportWelcomeBanner } from "@acme/ui";

//TODO:make categories and change banner
export default function Home() {
  return (
    <div>
      <div className="card mobile:p-1 mobile:mb-5 bg-themeColorSecondary w-full p-4">
        <div className="space-y-6">
          <div className="mobile:mr-0 mobile:p-1 mobile:text-xl mr-24 pr-10 text-center text-4xl font-bold leading-tight text-white">
            <ReportWelcomeBanner
              header="Your Future Is Bright, Bright Like A Diamond."
              subHeader="Discover Scholarships and Bursaries That Are Looking For Students Like You."
              img="/report_banner.gif"
            />
          </div>
        </div>
      </div>
      <div className="desktop:mt-5 laptop:mt-5 mobile:mt-4 desktop:grid-cols-5 laptop:grid-cols-3 mobile:grid-cols-1 grid place-items-stretch gap-3">
        {reportCategories?.map((report) => <ReportListing link={""} />)}
      </div>
    </div>
  );
}
