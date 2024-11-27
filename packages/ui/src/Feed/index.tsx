"use client";

import React, { useEffect, useState } from "react";

import FeedGrid from "./grid";
import FeedSearch from "./search";

export interface FeedPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  likes: number;
  imageUrl: string;
}

export default function Feed() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      // Simulating an API call
      //TODO: Fetch feeds here
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const fetchedPosts: FeedPost[] = [
        {
          id: "1",
          title: "Getting Started with React",
          excerpt:
            "Learn the basics of React and start building your first component.",
          author: "Jane Doe",
          date: "2023-06-01",
          likes: 120,
          imageUrl: "/placeholder.svg?height=200&width=400",
        },
        {
          id: "2",
          title: "Advanced TypeScript Techniques",
          excerpt:
            "Dive deep into TypeScript and learn advanced types and patterns.",
          author: "John Smith",
          date: "2023-06-05",
          likes: 85,
          imageUrl: "/placeholder.svg?height=200&width=400",
        },
        {
          id: "3",
          title: "Building Responsive Layouts with Tailwind CSS",
          excerpt:
            "Master the art of creating responsive designs using Tailwind CSS.",
          author: "Alice Johnson",
          date: "2023-06-10",
          likes: 150,
          imageUrl: "/placeholder.svg?height=200&width=400",
        },
      ];
      setPosts(fetchedPosts);
      setIsLoading(false);
    };

    void fetchPosts();
  }, []);

  const handleLike = (id: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post,
      ),
    );

    //TODO: Implement like function here
  };

  const handleShare = (id: string) => {
    // TODO: Implement sharing functionality here
    console.log(`Sharing post with id: ${id}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <main className="flex-1">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeedSearch posts={posts} setPosts={setPosts} />
          <FeedGrid
            posts={posts}
            handleShare={handleShare}
            handleLike={handleLike}
            isLoading={isLoading}
          />
        </div>
        {!isLoading && posts.length === 0 && (
          <p className="mt-8 text-center text-gray-500">No feed posts found.</p>
        )}
      </main>
    </div>
  );
}
