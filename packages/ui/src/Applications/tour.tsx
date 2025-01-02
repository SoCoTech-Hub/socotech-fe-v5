"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "../button";
import { Card, CardContent } from "../card";

interface WelcomeBannerProps {
  header?: string;
  tourImage: string;
}

const WelcomeBanner = ({
  header = "Explore qualifications currently available in SA",
  tourImage,
}: WelcomeBannerProps) => {
  const [closed, setClosed] = useState(false);

  if (closed) {
    return null;
  }

  return (
    <Card className="bg-applicationsBg">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-6 md:p-10">
            <img
              src={tourImage}
              alt="Welcome Image"
              className="mx-auto object-contain"
            />
          </div>
          <div className="relative flex-1 p-6">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => setClosed(true)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
            <h2 className="text-textColor mb-4 text-3xl font-bold leading-tight md:text-4xl">
              {header}
            </h2>
            <p className="text-textColor mb-6 text-lg leading-snug">
              Start your career by searching and selecting the perfect
              qualification to land the job of your dreams
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;
