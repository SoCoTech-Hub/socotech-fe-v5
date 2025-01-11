import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

import { api } from "../api/api";
import { userId } from "../context/constants";

const PageTracking = () => {
  const { asPath, basePath } = useRouter();
  const [actionsArray, setActionsArray] = useState<string[]>([]);
  const startTimeRef = useState<Date>(new Date())[0];

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!url.endsWith("#")) {
        createPageTrack(url);
      }
    };

    Router.events.on("routeChangeStart", handleRouteChange);
    window.addEventListener("beforeunload", () => createPageTrack(asPath));

    return () => {
      Router.events.off("routeChangeStart", handleRouteChange);
      window.removeEventListener("beforeunload", () => createPageTrack(asPath));
    };
  }, [asPath, actionsArray]);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const trackingAction = (event.target as HTMLElement).getAttribute(
        "data-tracking-action",
      );
      if (trackingAction) {
        setActionsArray((prev) => [...prev, trackingAction]);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const createPageTrack = async (url: string) => {
    const endTime = new Date();
    const timeSpent = (endTime.getTime() - startTimeRef.getTime()) / 1000 / 60;

    const currentUrl = `${basePath}${asPath !== "/" ? asPath : ""}`;
    if (currentUrl === url) return;

    try {
      await api.POST("/page-tracks", {
        time: timeSpent,
        user: userId,
        title: document.title || "Page title not found",
        url: currentUrl,
        action: [...actionsArray, `Navigated to ${url}`],
      });
      setActionsArray([]);
    } catch (error) {
      console.error("Error creating page track:", error);
    }
  };

  return null;
};

export default PageTracking;
