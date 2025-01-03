"use client";

import { Star } from "lucide-react";

export interface LessonsRating {
  id: number;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  usefulCount: number;
  timestamp: Date;
}

export interface LessonsRatingSummaryProps {
  ratings: LessonsRating[];
}

export default function LessonsRatingSummary({
  ratings,
}: LessonsRatingSummaryProps) {
  const averageRating =
    ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
  const ratingCounts = ratings.reduce(
    (counts, r) => {
      counts[r.rating] = (counts[r.rating] ?? 0) + 1;
      return counts;
    },
    {} as Record<number, number>,
  );

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 p-6">
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Rating Summary</h2>
        <div className="mb-4 flex items-center">
          <div className="mr-2 text-4xl font-bold">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 ${
                  star <= Math.round(averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="ml-2 text-sm text-gray-500">
            ({ratings.length} ratings)
          </div>
        </div>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center">
              <span className="w-4 text-sm">{star}</span>
              <Star className="mr-2 h-4 w-4 fill-yellow-400 text-yellow-400" />
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-yellow-400"
                  style={{
                    width: `${((ratingCounts[star] ?? 0) / ratings.length) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="ml-2 text-sm text-gray-500">
                {ratingCounts[star] ?? 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
