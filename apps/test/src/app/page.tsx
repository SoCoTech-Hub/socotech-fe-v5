"use client";

import React from "react";

import AccessDenied from "@acme/ui/AccessDenied/accessDenied";

export default function Home() {
  return (
    <div>
      <AccessDenied isOpen={true} />
    </div>
  );
}
