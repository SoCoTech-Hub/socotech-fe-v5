"use client";

import { useState } from "react";
import { Star } from "lucide-react";

import { Button } from "../button";
import { useToast } from "../hooks/use-toast";
import { Textarea } from "../textarea";

interface Rating {
  id: number;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  usefulCount: number;
  timestamp: Date;
}

export default function Rating() {
  const [ratings, setRatings] = useState<Rating[]>();
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const { toast } = useToast();

  const handleRatingSubmit = () => {
    if (userRating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }
    const newRating: Rating = {
      id: ratings.length + 1,
      userId: `user${ratings.length + 1}`,
      userName: `User ${ratings.length + 1}`, // This would be the actual user's name in a real app
      userAvatar: "/placeholder.svg?height=40&width=40", // This would be the actual user's avatar in a real app
      rating: userRating,
      comment: userComment,
      usefulCount: 0,
      timestamp: new Date(),
    };
    setRatings([...ratings, newRating]);
    setUserRating(0);
    setUserComment("");
    toast({
      title: "Rating submitted",
      description: "Thank you for your feedback!",
    });
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 p-6">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Submit Your Rating</h2>
        <div className="mb-4 flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant="ghost"
              size="sm"
              onClick={() => setUserRating(star)}
              className={`p-1 ${userRating >= star ? "text-yellow-400" : "text-gray-300"}`}
            >
              <Star
                className={`h-8 w-8 ${userRating >= star ? "fill-yellow-400" : ""}`}
              />
            </Button>
          ))}
        </div>
        <Textarea
          placeholder="Write your review here..."
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          className="mb-4"
        />
        <Button onClick={handleRatingSubmit}>Submit Rating</Button>
      </div>
    </div>
  );
}
