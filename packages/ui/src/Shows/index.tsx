"use client";

import { useEffect, useState } from "react";

import type { Show } from "./card";
import ShowGrid from "./grid";

export default function ShowsPage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      setIsLoading(true);
      // Simulating an API call
      //TODO fetch data for shows here
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const fetchedShows: Show[] = [
        {
          id: "1",
          title: "The Art of Programming",
          imageUrl: "/placeholder.svg?height=200&width=400",
        },
        {
          id: "2",
          title: "Data Structures and Algorithms",
          imageUrl: "/placeholder.svg?height=200&width=400",
        },
        {
          id: "3",
          title: "Web Development Masterclass",
          imageUrl: "/placeholder.svg?height=200&width=400",
        },
        {
          id: "4",
          title: "Machine Learning Fundamentals",
          imageUrl: "/placeholder.svg?height=200&width=400",
        },
        {
          id: "5",
          title: "Mobile App Development with React Native",
          imageUrl: "/placeholder.svg?height=200&width=400",
        },
        {
          id: "6",
          title: "DevOps and Continuous Integration",
          imageUrl: "/placeholder.svg?height=200&width=400",
        },
        {
          id: "7",
          title: "Cybersecurity Essentials",
          imageUrl: "/placeholder.svg?height=200&width=400",
        },
        {
          id: "8",
          title: "Blockchain and Cryptocurrency",
          imageUrl: "/placeholder.svg?height=200&width=400",
        },
      ];
      setShows(fetchedShows);
      setIsLoading(false);
    };

    void fetchShows();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Shows</h1>
      <ShowGrid shows={shows} isLoading={isLoading} />
    </div>
  );
}
