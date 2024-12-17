import React from "react";

import Section from "@acme/ui/profile/section";
import Cover from "@acme/ui/support/cover";

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
