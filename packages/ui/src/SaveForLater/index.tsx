"use client";

import React, { useEffect, useState } from "react";
import { Bookmark, X } from "lucide-react";

import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { toast } from "../hooks/use-toast";
import { ScrollArea } from "../scroll-area";

interface Blog {
  id: string;
  title: string;
  description: string;
}

interface SaveForLaterProps {
  blog: Blog;
}

export function SaveButton({ blog }: SaveForLaterProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("savedBlogs") || "[]");
    setIsSaved(savedBlogs.some((savedBlog: Blog) => savedBlog.id === blog.id));
  }, [blog.id]);

  const handleSave = () => {
    const savedBlogs = JSON.parse(localStorage.getItem("savedBlogs") || "[]");
    if (isSaved) {
      const updatedBlogs = savedBlogs.filter(
        (savedBlog: Blog) => savedBlog.id !== blog.id,
      );
      localStorage.setItem("savedBlogs", JSON.stringify(updatedBlogs));
      setIsSaved(false);
      toast({
        title: "Blog removed",
        description: "The blog has been removed from your saved list.",
      });
    } else {
      savedBlogs.push(blog);
      localStorage.setItem("savedBlogs", JSON.stringify(savedBlogs));
      setIsSaved(true);
      toast({
        title: "Blog saved",
        description: "The blog has been added to your saved list.",
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleSave}
      aria-label={isSaved ? "Remove from saved" : "Save for later"}
    >
      <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
    </Button>
  );
}

export function SavedBlogsList() {
  const [savedBlogs, setSavedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem("savedBlogs") || "[]");
    setSavedBlogs(blogs);
  }, []);

  const handleRemove = (id: string) => {
    const updatedBlogs = savedBlogs.filter((blog) => blog.id !== id);
    localStorage.setItem("savedBlogs", JSON.stringify(updatedBlogs));
    setSavedBlogs(updatedBlogs);
    toast({
      title: "Blog removed",
      description: "The blog has been removed from your saved list.",
    });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Saved Blogs</CardTitle>
        <CardDescription>
          Your list of saved blogs for later reading.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full pr-4">
          {savedBlogs.length === 0 ? (
            <p className="text-center text-gray-500">No saved blogs yet.</p>
          ) : (
            <ul className="space-y-4">
              {savedBlogs.map((blog) => (
                <li key={blog.id} className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{blog.title}</h3>
                    <p className="text-sm text-gray-500">{blog.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(blog.id)}
                    aria-label={`Remove ${blog.title} from saved`}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          {savedBlogs.length} {savedBlogs.length === 1 ? "blog" : "blogs"} saved
        </p>
      </CardFooter>
    </Card>
  );
}
