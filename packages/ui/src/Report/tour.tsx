// TODO:data fetch
"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "../button";
import { Card, CardContent } from "../card";

export interface ReportWelcomeBannerProps {
  header?: string;
  subHeader?: string;
  img?: string;
}

export const ReportWelcomeBanner = ({
  header = "Explore bursaries currently available in SA",
  subHeader = "Start your journey by exploring and applying for bursaries that can help fund your education and future career.",
  img = "/applications-tour.png",
}: ReportWelcomeBannerProps) => {
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) return null;

  return (
    <Card className="bg-applicationsBg w-full">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-1 items-center justify-center p-6 md:p-10">
            <img
              src={img}
              alt="Welcome Image"
              className="h-72 w-96 object-contain"
            />
          </div>
          <div className="relative flex-1 p-6">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => setIsClosed(true)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
            <h2 className="text-textColor mb-4 pt-3 text-3xl font-bold leading-tight md:text-4xl">
              {header}
            </h2>
            <p className="text-textColor mb-6 text-lg leading-snug">
              {subHeader}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
