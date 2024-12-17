import React from "react";

import Cover from "@acme/ui/support/cover";
import TicketingDashboard from "@acme/ui/support/index";

export default function Home() {
  return (
    <div>
      <div className="col row">
        <div className="mobile:hidden">
          <Cover />
        </div>
        <div className="mobile:space-y-3 mobile:w-full mobile:px-3 mobile:mb-10 space-y-10">
          <TicketingDashboard />
        </div>
      </div>
    </div>
  );
}
