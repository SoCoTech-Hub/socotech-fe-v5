"use client";

import type { BlogPost } from ".";
import BlogCard from "./card";
import BlogCardSkeleton from "./loader";

interface BlogGridProps {
  handleShare?: (id: string) => void;
  handleLike?: (id: string) => void;
  handleSave?: (id: string) => void;
  isLoading?: boolean;
  posts?: BlogPost[];
}

export default function BlogGrid(props: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {props.isLoading
        ? Array(6)
            .fill(0)
            .map((_, index) => <BlogCardSkeleton key={index} />)
        : props.posts?.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onSave={props.handleSave}
              onLike={props.handleLike}
              onShare={props.handleShare}
            />
          ))}
    </div>
  );
}
