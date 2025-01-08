import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { api } from "@acme/snippets/api/api";

import { orgId, userId } from "../context/constants";

interface TimeTrack {
  userId: string; // User ID (optional, fetch from context if needed)
  organizationId: string; // Organization ID (optional, fetch from context if needed)
  from: string; // Previous page
  to: string; // Current page
  duration: number; // Time spent in seconds
  created_at: string; // ISO timestamp
}

export const useTimeTracker = () => {
  const router = useRouter();
  const startTimeRef = useRef<number | null>(null);
  const previousPathRef = useRef<string>("");

  const trackTime = async (data: TimeTrack) => {
    try {
      await api.POST("/time-tracks", {
        body: data,
      });
    } catch (error) {
      console.error("Failed to track time:", error);
    }
  };

  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      const endTime = Date.now();
      if (startTimeRef.current) {
        const duration = (endTime - startTimeRef.current) / 1000; // in seconds

        // Send tracking data to the API
        trackTime({
          userId: userId || "",
          organizationId: orgId || "1",
          from: previousPathRef.current,
          to: url,
          duration,
          created_at: new Date().toISOString(),
        });
      }

      // Update the start time and previous path
      startTimeRef.current = endTime;
      previousPathRef.current = url;
    };

    // Initialize tracking when the page loads
    const handleRouteChangeComplete = (url: string) => {
      startTimeRef.current = Date.now();
      previousPathRef.current = url;
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    // Cleanup on unmount
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  return null; // No UI component needed
};
