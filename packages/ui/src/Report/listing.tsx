// TODO:data fetch

import Image from "next/image";

import { Button } from "../button";
import { Card, CardContent } from "../card";
import { cn } from "../utils";

export interface ReportListingProps {
  id: string;
  applicationFeatureImage?: string;
  courseTitle?: string;
  courseCompanyName?: string;
  courseDescription?: string;
  setSelection: (id: string) => void;
  bgColor?: string;
  iconSvg?: string;
}

export const ReportListing = ({
  id,
  applicationFeatureImage = "",
  courseTitle = "Course Title Goes Here",
  courseCompanyName = "Company name goes here",
  courseDescription = "Description of the job goes here but not all of it. Description of the job goes here but not all of it.",
  setSelection,
  bgColor = "",
  iconSvg = "",
}: ReportListingProps) => {
  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <Button
          variant="ghost"
          className="w-full h-auto p-0 hover:bg-transparent"
          onClick={() => setSelection(id)}
        >
          <div className="flex items-center w-full h-24">
            <div className="flex-shrink-0 mx-3 h-14 w-14">
              <div
                className={cn(
                  "h-14 w-14 overflow-hidden rounded-full",
                  bgColor ? bgColor : "bg-primary",
                )}
              >
                {iconSvg ? (
                  <div
                    className="flex items-center justify-center w-full h-full"
                    style={{ backgroundColor: bgColor || "var(--primary)" }}
                    dangerouslySetInnerHTML={{ __html: iconSvg }}
                  />
                ) : applicationFeatureImage ? (
                  <Image
                    src={applicationFeatureImage}
                    alt={courseTitle}
                    width={56}
                    height={56}
                    className="object-cover rounded-lg"
                  />
                ) : null}
              </div>
            </div>
            <div className="flex-grow text-left">
              <div className="line-clamp-1">
                <div
                  className="font-semibold leading-tight text-foreground"
                  dangerouslySetInnerHTML={{ __html: courseTitle }}
                />
              </div>
              <div className="line-clamp-1">
                <div
                  className="font-semibold leading-tight text-foreground"
                  dangerouslySetInnerHTML={{ __html: courseCompanyName }}
                />
              </div>
              <div className="line-clamp-1">
                <div
                  className="text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: courseDescription }}
                />
              </div>
            </div>
          </div>
        </Button>
      </CardContent>
    </Card>
  );
};


