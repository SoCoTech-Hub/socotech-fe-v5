import React from "react";

import Cover from "@acme/ui/profile/cover";
import Section from "@acme/ui/profile/section";

export default function Home() {
  return (
    <div>
      <div className="col row">
        <div className="mobile:gy-0 mobile:space-y-0">
          <div className="mobile:hidden">
            <Cover />
          </div>

          <div className="">
            <Section />
          </div>
        </div>
      </div>
    </div>
  );
}
