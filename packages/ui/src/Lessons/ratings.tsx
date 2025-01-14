"use client";

import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import { useToast } from "../hooks/use-toast";
import { Input } from "../input";

export interface Rating {
  id: number;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  usefulCount: number;
  timestamp: Date;
}

export function LessonRatingComponent(props: Rating[]) {
  const [ratings, setRatings] = useState<Rating[]>(props);
  const [newComment, setNewComment] = useState("");
  const [commentingOn, setCommentingOn] = useState<number | null>(null);
  const { toast } = useToast();

  const handleCommentSubmit = (ratingId: number) => {
    setRatings(
      ratings.map((r) =>
        r.id === ratingId
          ? { ...r, comment: r.comment + "\n\nReply: " + newComment }
          : r,
      ),
    );
    setNewComment("");
    setCommentingOn(null);
    toast({
      title: "Comment added",
      description: "Your comment has been added to the rating.",
    });
  };

  const handleUsefulMark = (ratingId: number) => {
    setRatings(
      ratings.map((r) =>
        r.id === ratingId ? { ...r, usefulCount: r.usefulCount + 1 } : r,
      ),
    );
    toast({
      title: "Marked as useful",
      description: "Thank you for your feedback!",
    });
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 p-6">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">User Ratings</h2>
        <div className="space-y-6">
          {ratings.map((rating) => (
            <div key={rating.id} className="border-b pb-4 last:border-b-0">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="mr-2 h-10 w-10">
                    <AvatarImage
                      src={rating.userAvatar}
                      alt={rating.userName}
                    />
                    <AvatarFallback>{rating.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{rating.userName}</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= rating.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">
                        {rating.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleUsefulMark(rating.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  {rating.usefulCount}
                </Button>
              </div>
              <p className="mb-2 whitespace-pre-wrap text-gray-700">
                {rating.comment}
              </p>
              {commentingOn === rating.id ? (
                <div className="mt-2">
                  <Input
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-2"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleCommentSubmit(rating.id)}
                  >
                    Post Comment
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setCommentingOn(null)}
                    className="ml-2"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setCommentingOn(rating.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Add Comment
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
