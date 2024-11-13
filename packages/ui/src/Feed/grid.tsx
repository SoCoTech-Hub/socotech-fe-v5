"use client";

import type { FeedPost } from ".";
import FeedCard from "./card";
import FeedCardSkeleton from "./loader";

export interface FeedGridProps {
  handleShare?: (id: string) => void;
  handleLike?: (id: string) => void;
  handleSave?: (id: string) => void;
  isLoading?: boolean;
  posts?: FeedPost[];
}

export default function FeedGrid(props: FeedGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {props.isLoading
        ? Array(6)
            .fill(0)
            .map((_, index) => <FeedCardSkeleton key={index} />)
        : props.posts?.map((post) => (
            <FeedCard
              key={post.id}
              post={post}
              onLike={props.handleLike}
              onShare={props.handleShare}
            />
          ))}
    </div>
  );
}
