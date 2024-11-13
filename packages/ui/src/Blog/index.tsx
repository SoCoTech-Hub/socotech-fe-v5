"use client";

import { useEffect, useState } from "react";

import BlogGrid from "./grid";
import SavedArticlesList from "./savedArticles";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  likes: number;
  saved: boolean;
  imageUrl: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [savedPosts, setSavedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      // Simulating an API call
      //TODO: Fetch blogs here
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const fetchedPosts: BlogPost[] = [
        {
          id: "1",
          title: "Getting Started with React",
          excerpt:
            "Learn the basics of React and start building your first component.",
          author: "Jane Doe",
          date: "2023-06-01",
          likes: 120,
          saved: false,
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
          saved: false,
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
          saved: false,
          imageUrl: "/placeholder.svg?height=200&width=400",
        },
      ];
      setPosts(fetchedPosts);
      setIsLoading(false);
    };

    void fetchPosts();
  }, []);

  const handleSave = (id: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, saved: !post.saved } : post,
      ),
    );
    setSavedPosts((prevSaved) => {
      const post = posts.find((p) => p.id === id);
      if (post) {
        if (post.saved) {
          return prevSaved.filter((p) => p.id !== id);
        } else {
          return [...prevSaved, post];
        }
      }
      return prevSaved;
    });
    //TODO: Implement save function here
  };

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

  const handleRemove = (id: string) => {
    setSavedPosts((prevSaved) => prevSaved.filter((post) => post.id !== id));
    setPosts(
      posts.map((post) => (post.id === id ? { ...post, saved: false } : post)),
    );
    //TODO: Implement remove saved function here
  };

  // const handleReadLater = (id: string) => {
  //   // TODO: Implement read later functionality here
  //   console.log(`Marking post with id: ${id} for reading later`);
  // };

  return (
    <div className="flex flex-col md:flex-row">
      <aside className="mb-4 w-full md:mb-0 md:mr-8 md:w-64">
        <SavedArticlesList savedPosts={savedPosts} onRemove={handleRemove} />
      </aside>
      <main className="flex-1">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <BlogGrid
            posts={posts}
            handleShare={handleShare}
            handleLike={handleLike}
            handleSave={handleSave}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}
