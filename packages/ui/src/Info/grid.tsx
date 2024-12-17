"use client";

import { useEffect, useState } from "react";

import type { Info } from "./card";
import InfoCard from "./card";
import InfoCardSkeleton from "./loader";

export interface InfoGridProps {
  infos: Info[];
  isLoading?: boolean;
}

export default function InfoGrid({
  infos,
  isLoading = false,
}: InfoGridProps) {
  const [displayedInfos, setDisplayedInfos] = useState<Info[]>([]);

  useEffect(() => {
    if (!isLoading) {
      setDisplayedInfos(infos);
    }
  }, [infos, isLoading]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {isLoading
        ? Array(8)
            .fill(0)
            .map((_, index) => <InfoCardSkeleton key={index} />)
        : displayedInfos.map((info) => <InfoCard key={info.id} info={info} />)}
    </div>
  );
}
