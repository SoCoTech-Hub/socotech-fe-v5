/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React from "react";
import { Star, ThumbsUp, User } from "lucide-react";

import { cn } from "../select";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { Button } from "../button";
import { Progress } from "../progress";

interface Review {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  rating: number;
  date: string;
  content: string;
  helpfulCount: number;
}

interface RatingReviewProps {
  averageRating: number;
  totalRatings: number;
  ratingDistribution: number[];
  reviews: Review[];
  onWriteReview: () => void;
  className?: string;
}

export function RatingReview({
  averageRating,
  totalRatings,
  ratingDistribution,
  reviews,
  onWriteReview,
  className,
}: RatingReviewProps) {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={cn(
          "h-6 w-6",
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
        )}
      />
    ));
  };

  return (
    <div className={cn("grid gap-6 md:grid-cols-3", className)}>
      {/* Average Rating Section */}
      <div className="rounded-lg bg-[#E2F783] p-6 text-center">
        <div className="mb-2 text-6xl font-bold">{averageRating}</div>
        <div className="mb-2 flex justify-center">
          {renderStars(Math.round(averageRating))}
        </div>
        <div className="mb-2 text-xl">Avg. Rating</div>
        <div className="text-lg">{totalRatings} Ratings</div>
      </div>

      {/* Rating Distribution Section */}
      <div className="space-y-2">
        {ratingDistribution.map((count, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="w-3">{5 - index}</span>
            <Progress value={(count / totalRatings) * 100} className="h-2" />
            <span className="w-8 text-sm text-gray-600">{count}</span>
          </div>
        ))}
      </div>

      {/* Write Review Section */}
      <div className="rounded-lg bg-[#E2F783] p-6 text-center">
        <p className="mb-2 text-lg">Tell us about your experience.</p>
        <p className="mb-4 text-gray-600">We would love to know.</p>
        <Button
          className="w-full bg-black text-white hover:bg-gray-800"
          onClick={onWriteReview}
        >
          Write a review
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6 md:col-span-3">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={review.author.avatar} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{review.author.name}</div>
                <div className="flex items-center gap-1">
                  {renderStars(review.rating)}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">Posted: {review.date}</div>
            <p className="text-gray-700">{review.content}</p>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <ThumbsUp className="mr-2 h-4 w-4" />
              {review.helpfulCount}{" "}
              {review.helpfulCount === 1 ? "person" : "people"} found this
              helpful
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
