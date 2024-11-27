"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";

import { Button } from "../button";
import { useToast } from "../hooks/use-toast";
import { Textarea } from "../textarea";

interface RatingSubmissionProps {
  onSubmit: (rating: { rating: number; comment: string }) => void;
}

export default function RatingSubmission({ onSubmit }: RatingSubmissionProps) {
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (userRating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    onSubmit({ rating: userRating, comment: userComment });
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
        <Button onClick={handleSubmit}>Submit Rating</Button>
      </div>
    </div>
  );
}
