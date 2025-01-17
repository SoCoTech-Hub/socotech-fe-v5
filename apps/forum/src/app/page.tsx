"use client";

import React, { useEffect, useState } from "react";

import { ForumDisplay } from "@acme/ui";

interface ForumThread {
  id: string;
  title: string;
  author: string;
  replies: number;
  lastActivity: Date;
}

// TODO:fetch data from an API
const fetchThreads = async (): Promise<ForumThread[]> => {
  return [
    {
      id: "1",
      title: "How to get started with React?",
      author: "newbie123",
      replies: 5,
      lastActivity: new Date("2023-06-10T10:00:00Z"),
    },
    {
      id: "2",
      title: "Best practices for state management",
      author: "reactPro",
      replies: 12,
      lastActivity: new Date("2023-06-11T15:30:00Z"),
    },
    {
      id: "3",
      title: "Optimizing React performance",
      author: "speedFreak",
      replies: 8,
      lastActivity: new Date("2023-06-12T09:45:00Z"),
    },
    {
      id: "4",
      title: "How to handle forms in React?",
      author: "formMaster",
      replies: 15,
      lastActivity: new Date("2023-06-13T14:20:00Z"),
    },
    {
      id: "5",
      title: "React Hooks explained",
      author: "hookFan",
      replies: 20,
      lastActivity: new Date("2023-06-14T11:10:00Z"),
    },
  ];
};

export default function Home() {
  const [threads, setThreads] = useState<ForumThread[]>([]);

  useEffect(() => {
    const loadThreads = async () => {
      const data = await fetchThreads();
      setThreads(data);
    };
    loadThreads();
  }, []);

  return (
    <div>
      <ForumDisplay threads={threads} />
    </div>
  );
}
