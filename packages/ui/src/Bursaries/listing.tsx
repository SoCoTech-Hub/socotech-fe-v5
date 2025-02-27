import { Button } from "../button";
import { Card, CardContent } from "../card";
import { cn } from "../utils";

export interface BursaryListingProps {
  id: string;
  applicationFeatureImage?: string;
  courseTitle?: string;
  courseCompanyName?: string;
  courseDescription?: string;
  setSelection: (id: string) => void;
  bgColor?: string;
  iconSvg?: string;
}

export const BursaryListing = ({
  id,
  applicationFeatureImage = "",
  courseTitle = "Course Title Goes Here",
  courseCompanyName = "Company name goes here",
  courseDescription = "Description of the job goes here but not all of it. Description of the job goes here but not all of it.",
  setSelection,
  bgColor = "",
  iconSvg = "",
}: BursaryListingProps) => {
  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <Button
          variant="ghost"
          className="h-auto w-full p-0 hover:bg-transparent"
          onClick={() => setSelection(id)}
        >
          <div className="flex h-24 w-full items-center">
            <div className="mx-3 h-14 w-14 flex-shrink-0">
              <div
                className={cn(
                  "h-14 w-14 overflow-hidden rounded-full",
                  bgColor ? bgColor : "bg-primary",
                )}
              >
                {iconSvg ? (
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{ backgroundColor: bgColor || "var(--primary)" }}
                    dangerouslySetInnerHTML={{ __html: iconSvg }}
                  />
                ) : applicationFeatureImage ? (
                  <img
                    src={applicationFeatureImage}
                    alt={courseTitle}
                    className="rounded-lg object-cover"
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
