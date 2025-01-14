// TODO:data fetch

import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "../button";
import { Card, CardContent } from "../card";

export interface QualificationWelcomeBannerProps {
  header?: string;
  subHeader?: string;
  img?: string;
}

export const QualificationWelcomeBanner = ({
  header = "Explore bursaries currently available in SA",
  subHeader = "Start your journey by exploring and applying for bursaries that can help fund your education and future career.",
  img = "/applications-tour.png",
}: QualificationWelcomeBannerProps) => {
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) return null;

  return (
    <Card className="w-full bg-applicationsBg">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="flex items-center justify-center flex-1 p-6 md:p-10">
            <img
              src={img}
              alt="Welcome Image"
              className="object-contain h-72 w-96"
            />
          </div>
          <div className="relative flex-1 p-6">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2"
              onClick={() => setIsClosed(true)}
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Close</span>
            </Button>
            <h2 className="pt-3 mb-4 text-3xl font-bold leading-tight text-textColor md:text-4xl">
              {header}
            </h2>
            <p className="mb-6 text-lg leading-snug text-textColor">
              {subHeader}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


