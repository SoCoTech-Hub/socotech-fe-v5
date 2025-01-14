import { Building2 } from "lucide-react";

import TimeDifferenceFromDate from "@acme/snippets/functions/timeDifferenceFromDate";

import { Button } from "../button";
import { Card, CardContent, CardFooter } from "../card";
import { Section } from "./section";

interface QualificationPostProps {
  loading: boolean;
  courseTitle?: string;
  companyDescription?: string;
  timePosted?: string;
  open?: string;
  close?: string;
  whoQualifies?: string;
  application?: string;
  particulars?: string;
  notes?: string;
  value?: string;
  iconSvg?: string;
  applicationFeatureImage?: string;
  bgColor?: string;
  numberOfApplicants?: string;
  qualificationId?: string;
  qualificationUrl?: string;
  applyQualification?: (data: {
    qualificationId: string;
    qualificationUrl: string;
  }) => Promise<void>;
}

export const QualificationPost: React.FC<QualificationPostProps> = ({
  loading,
  courseTitle = "",
  companyDescription = "",
  timePosted = "",
  open = "",
  close = "",
  whoQualifies = "",
  application = "",
  particulars = "",
  notes = "",
  value = "",
  iconSvg = "",
  applicationFeatureImage = "",
  bgColor = "",
  numberOfApplicants = "",
  qualificationId,
  qualificationUrl,
  applyQualification,
}) => {
  const apply = async () => {
    if (!qualificationId || !qualificationUrl) {
      console.error("Missing required application data.");
      return;
    }

    try {
      await applyQualification?.({
        qualificationId,
        qualificationUrl,
      });
      console.log("Application submitted successfully.");
    } catch (error) {
      console.error("Application submission failed:", error);
    }
  };

  if (loading) {
    return (
      <Card className="h-72 w-full">
        <CardContent className="flex h-full items-center justify-center">
          <div className="w-full animate-pulse space-y-4">
            <div className="h-4 w-3/4 rounded bg-gray-300"></div>
            <div className="h-4 w-1/2 rounded bg-gray-300"></div>
            <div className="h-4 w-1/3 rounded bg-gray-300"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {/* Header Section */}
        <div className="mb-4 flex items-center space-x-4">
          <div className="hidden h-14 w-14 overflow-hidden rounded-lg bg-primary md:block">
            {iconSvg ? (
              <div
                className="flex h-full w-full items-center justify-center"
                style={{ backgroundColor: bgColor || "var(--primary)" }}
                dangerouslySetInnerHTML={{ __html: iconSvg }}
              />
            ) : applicationFeatureImage ? (
              <img
                src={applicationFeatureImage}
                alt={courseTitle || "Feature Image"}
                className="object-cover"
              />
            ) : null}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{courseTitle}</h2>
            <p className="text-sm text-muted-foreground">
              {companyDescription}
              {timePosted && numberOfApplicants && (
                <span className="ml-4">
                  {TimeDifferenceFromDate(timePosted)} - {numberOfApplicants}{" "}
                  {parseInt(numberOfApplicants) !== 1
                    ? "applicants"
                    : "applicant"}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Open/Close Dates */}
        <div className="mb-4 flex items-center space-x-2">
          <Building2 className="h-6 w-6" />
          <span className="text-muted-foreground">
            {open || close
              ? `${open || "Currently Open"} - ${close || ""}`
              : "Date: TBC"}
          </span>
        </div>

        {/* Sections */}
        {whoQualifies && (
          <Section title="Who Qualifies?" content={whoQualifies} />
        )}
        {application && <Section title="Applications" content={application} />}
        {value && <Section title="Value" content={value} />}
        {particulars && <Section title="Particulars" content={particulars} />}
        {notes && <Section title="Notes" content={notes} />}
      </CardContent>

      {/* Footer */}
      {courseTitle && qualificationUrl && (
        <CardFooter>
          <Button onClick={apply} className="w-full">
            Apply
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
