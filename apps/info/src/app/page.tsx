"use client";

import React, { useEffect, useState } from "react";

import type { Info } from "@acme/ui/Info/card.js";
import { InfosPage, InfosPageProps } from "@acme/ui";

export default function Home() {
  const [infos, setInfos] = useState<Info[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInfos = async () => {
      setIsLoading(true);
      // Simulate fetching data
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const fetchedInfos: Info[] = [
        {
          id: "1",
          title: "Terms of Use",
          imageUrl: "/terms.svg?height=200&width=400",
        },
        {
          id: "2",
          title: "Privacy Policy",
          imageUrl: "/privacy.svg?height=200&width=400",
        },
        {
          id: "3",
          title: "Cookies Policy",
          imageUrl: "/cookies.svg?height=200&width=400",
        },
        {
          id: "4",
          title: "FAQ",
          imageUrl: "/faq.svg?height=200&width=400",
        },
      ];
      setInfos(fetchedInfos);
      setIsLoading(false);
    };

    void fetchInfos();
  }, []);

  // Ensure correct props are passed to InfosPage
  const pageProps: InfosPageProps = { infos, isLoading };

  return (
    <div>
      <InfosPage {...pageProps} />
    </div>
  );
}
