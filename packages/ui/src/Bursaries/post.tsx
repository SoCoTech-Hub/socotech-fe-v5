// TODO:data fetch

import Image from "next/image";
import DigilibLoad from "@/components/DigilibLoad";
import { BuildingIcon } from "@/components/SvgIcons";
import applyBursary from "@/snippets/user/applyBursary";
import { getTimeDifferenceFromPostDate } from "@/snippets/user/getTimeDifferenceFromPostDate";

import { Button } from "../button";
import { Card, CardContent, CardFooter } from "../card";

interface BursaryPostProps {
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
  bursaryId?: string;
  bursaryUrl?: string;
  profileId?: string;
}

const BursaryPost: React.FC<BursaryPostProps> = ({
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
  bursaryId,
  bursaryUrl,
  profileId,
}) => {
  const apply = async () => {
    if (bursaryId && bursaryUrl && profileId) {
      await applyBursary({
        bursaryId,
        bursaryUrl,
        profileId,
      });
    }
  };

  if (loading) {
    return (
      <Card className="h-72 w-full">
        <CardContent className="flex h-full items-center justify-center">
          <DigilibLoad loading={loading} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center space-x-4">
          <div className="hidden h-14 w-14 overflow-hidden rounded-lg bg-primary md:block">
            {iconSvg ? (
              <div
                className="flex h-full w-full items-center justify-center"
                style={{ backgroundColor: bgColor || "var(--primary)" }}
                dangerouslySetInnerHTML={{ __html: iconSvg }}
              />
            ) : applicationFeatureImage ? (
              <Image
                src={applicationFeatureImage}
                alt={courseTitle}
                width={56}
                height={56}
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
                  {getTimeDifferenceFromPostDate(timePosted)} -{" "}
                  {numberOfApplicants}{" "}
                  {parseInt(numberOfApplicants) !== 1
                    ? "applicants"
                    : "applicant"}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="mb-4 flex items-center space-x-2">
          <BuildingIcon className="h-6 w-6" />
          <span className="text-muted-foreground">
            {open || close
              ? `${open || "Currently Open"} - ${close || ""}`
              : "Date: TBC"}
          </span>
        </div>

        {whoQualifies && (
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Who Qualifies?</h3>
            <div dangerouslySetInnerHTML={{ __html: whoQualifies }} />
          </div>
        )}

        {application && (
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Applications:</h3>
            <div dangerouslySetInnerHTML={{ __html: application }} />
          </div>
        )}

        {value && (
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Value:</h3>
            <div dangerouslySetInnerHTML={{ __html: value }} />
          </div>
        )}

        {particulars && (
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Particulars:</h3>
            <div dangerouslySetInnerHTML={{ __html: particulars }} />
          </div>
        )}

        {notes && (
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Notes:</h3>
            <div dangerouslySetInnerHTML={{ __html: notes }} />
          </div>
        )}
      </CardContent>

      {courseTitle && bursaryUrl && (
        <CardFooter>
          <Button onClick={apply} className="w-full">
            Apply
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BursaryPost;
