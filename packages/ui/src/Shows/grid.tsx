"use client";

import React, { useEffect, useState } from "react";

import type { Show } from "./card";
import ShowCard from "./card";
import ShowCardSkeleton from "./loader";

export interface ShowGridProps {
  shows: Show[];
  isLoading?: boolean;
}

export default function ShowGrid({ shows, isLoading = false }: ShowGridProps) {
  const [displayedShows, setDisplayedShows] = useState<Show[]>([]);

  useEffect(() => {
    if (!isLoading) {
      setDisplayedShows(shows);
    }
  }, [shows, isLoading]);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {isLoading
        ? Array(8)
            .fill(0)
            .map((_, index) => <ShowCardSkeleton key={index} />)
        : displayedShows.map((show) => <ShowCard key={show.id} show={show} />)}
    </div>
  );
}
