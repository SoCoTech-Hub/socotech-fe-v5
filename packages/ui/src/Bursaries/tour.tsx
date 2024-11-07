// TODO:data fetch

import React, { useState } from "react";
import Image from "next/image";
import { baseUrl } from "@/context/constants";
import { X } from "lucide-react";

import { Button } from "../button";
import { Card, CardContent } from "../card";

interface BursaryWelcomeBannerProps {
  header?: string;
}

const BursaryWelcomeBanner: React.FC<BursaryWelcomeBannerProps> = ({
  header = "Explore bursaries currently available in SA",
}) => {
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) return null;

  return (
    <Card className="bg-applicationsBg w-full">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-1 items-center justify-center p-6 md:p-10">
            <Image
              src={`${baseUrl}/applications-tour.png`}
              alt="Welcome Image"
              width={400}
              height={300}
              className="object-contain"
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
              Start your journey by exploring and applying for bursaries that
              can help fund your education and future career.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BursaryWelcomeBanner;
