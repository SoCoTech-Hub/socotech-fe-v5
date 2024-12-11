import React, { useEffect } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

import { tracker } from "@acme/snippets"; // Adjust import path

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      tracker.startTracking(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // Start tracking initial load
    tracker.startTracking(router.asPath);

    return () => {
      // Cleanup on unmount
      tracker.endTracking();
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    // Send data when the user navigates away from the app
    console.log(tracker);
    // TODO: call function to send to api
    const handleUnload = () => {}; //tracker.sendVisitsToServer();
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
