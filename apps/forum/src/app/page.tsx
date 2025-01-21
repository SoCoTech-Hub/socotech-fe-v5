"use client";

import React, { useEffect, useState } from "react";

import { FetchForums } from "@acme/snippets/functions/forum/forum";
import { ForumDisplay, ForumDisplayProps } from "@acme/ui";

export default function Home() {
  const [threads, setThreads] = useState<ForumDisplayProps["threads"]>([]); // Use threads from ForumDisplayProps

  useEffect(() => {
    const loadThreads = async () => {
      try {
        const { forums } = await FetchForums();

        // Transform the fetched data to match ForumThread interface
        const transformedThreads: ForumDisplayProps["threads"] = forums.map(
          (forum: any) => ({
            id: forum.id,
            title: forum.name || forum.question || "Untitled",
            author: forum.user?.profile
              ? `${forum.user.profile.firstName} ${forum.user.profile.lastName || ""}`
              : "Unknown Author",
            replies: forum.parentForum ? 1 : 0, // Replace with actual reply count if available
            lastActivity: new Date(forum.updated_at),
          }),
        );

        setThreads(transformedThreads);
      } catch (error) {
        console.error("Error fetching forums:", error);
      }
    };

    loadThreads();
  }, []);

  return (
    <div>
      <ForumDisplay threads={threads} /> {/* Correctly pass the threads prop */}
    </div>
  );
}
