// TODO:data fetch

import { Button } from "../button";
import { cn } from "../utils";

interface ApplicationsListingProps {
  id: string;
  applicationFeatureImage?: string;
  courseTitle?: string;
  courseCompanyName?: string;
  courseDescription?: string;
  setSelection: (id: string) => void;
  bgColor?: string;
  svgIcon?: string;
}

export function ApplicationsListing({
  id,
  applicationFeatureImage = "",
  courseTitle = "Course Title Goes Here",
  courseCompanyName = "Company name goes here",
  courseDescription = "Description of the job goes here but not all of it. Description of the job goes here but not all of it.",
  setSelection,
  bgColor = "",
  svgIcon = "",
}: ApplicationsListingProps) {
  return (
    <Button
      variant="ghost"
      className="h-auto w-full p-0 hover:bg-gray-100"
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
            {svgIcon ? (
              <div
                className="flex h-full w-full items-center justify-center"
                dangerouslySetInnerHTML={{ __html: svgIcon }}
              />
            ) : applicationFeatureImage ? (
              <img
                src={applicationFeatureImage}
                alt={courseTitle}
                width={56}
                height={56}
                className="object-cover"
              />
            ) : null}
          </div>
        </div>
        <div className="flex-grow text-left">
          <h3 className="truncate text-sm font-semibold leading-tight">
            {courseTitle}
          </h3>
          <p className="truncate text-sm font-semibold leading-tight text-gray-600">
            {courseCompanyName}
          </p>
          <p className="truncate text-sm leading-tight text-gray-500">
            {courseDescription}
          </p>
        </div>
      </div>
    </Button>
  );
}
