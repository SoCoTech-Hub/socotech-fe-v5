"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";

import type { PageVisit } from "./time-tracks";
import { useTimeTracker } from "./time-tracks";

interface TimeTrackerContextProps {
  logVisit: (visit: PageVisit) => void;
}

const TimeTrackerContext = createContext<TimeTrackerContextProps | undefined>(
  undefined,
);

export const TimeTrackerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const logVisit = (visit: PageVisit) => {
    console.log("Tracked page visit:", visit);

    // Add backend logging here
    // fetch('/api/log', { method: 'POST', body: JSON.stringify(visit) });
  };
  useTimeTracker(logVisit);
  return (
    <TimeTrackerContext.Provider value={{ logVisit }}>
      {children}
    </TimeTrackerContext.Provider>
  );
};

export const UseTimeTrackerContext = () => {
  const context = useContext(TimeTrackerContext);
  if (!context) {
    throw new Error(
      "UseTimeTrackerContext must be used within a TimeTrackerProvider",
    );
  }
  return context;
};
