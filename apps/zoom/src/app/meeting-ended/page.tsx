import React from "react";

import { Button } from "@acme/ui/button";

export default function MeetingEndedPage() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="mb-6 text-3xl font-bold">Meeting Ended</h1>
      <p className="mb-4">Thank you for participating in the meeting.</p>
      <a href="/">
        <Button>Return to Home</Button>
      </a>
    </div>
  );
}
