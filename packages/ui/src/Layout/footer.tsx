"use client";

import { useEffect, useState } from "react";

import { Version } from "@acme/config/version";
import { useOrgName } from "@acme/snippets/utils/contextUtils";

export function LayoutFooter() {
  const OrgName = useOrgName();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <footer className="border-t border-gray-200 bg-white p-4 text-center text-xs text-gray-600">
      <div className="flex items-center justify-between">
        <div>{OrgName}</div>
        <div>Platform Version: {Version}</div>
        <div>{currentDateTime.toLocaleString()}</div>
      </div>
    </footer>
  );
}
