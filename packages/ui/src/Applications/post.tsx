// TODO:data fetch

"use client";

import React from "react";

import applyQualification from "@acme/snippets/applyQualification";
import { getTimeDifferenceFromPostDate } from "@acme/snippets/getTimeDifferenceFromPostDate";

import { Button } from "../button";
import { Card, CardContent, CardFooter, CardHeader } from "../card";
import { Skeleton } from "../skeleton";
import { BriefcaseIcon, BuildingIcon, LightbulbIcon } from "../SvgIcons";

interface ApplicationsPostProps {
  loading: boolean;
  qualificationId: string;
  qualificationUrl: string;
  profileId: string;
  courseTitle?: string;
  companyDescription?: string;
  timePosted?: string;
  numberOfApplicants?: string;
  positionTitle?: string;
  fieldDescription?: string;
  compareDescription?: string;
  topDescription?: string;
  responsibilitiesDescription?: string;
  requirementsDescription?: string;
  applicationFeatureImage?: string;
  bgColor?: string;
  svgIcon?: string;
}

export function ApplicationsPost({
  loading,
  qualificationId,
  qualificationUrl,
  profileId,
  courseTitle = "",
  companyDescription = "",
  timePosted = "",
  numberOfApplicants = "",
  positionTitle = "",
  fieldDescription = "",
  compareDescription = "",
  topDescription = "",
  responsibilitiesDescription = "",
  requirementsDescription = "",
  applicationFeatureImage = "",
  bgColor = "",
  svgIcon = "",
}: ApplicationsPostProps) {
  const apply = async () => {
    await applyQualification({
      profileId,
      qualificationId,
      qualificationUrl,
    });
  };

  if (loading) {
    return (
      <Card className="h-72 w-full">
        <CardContent className="flex h-full items-center justify-center">
          <Skeleton className="h-12 w-12 rounded-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center space-x-4">
        <div className="h-14 w-14 overflow-hidden rounded-lg bg-primary">
          {svgIcon ? (
            <div
              className="flex h-full w-full items-center justify-center"
              style={{ backgroundColor: bgColor || "var(--primary)" }}
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
        <div>
          <h2 className="text-xl font-bold">{courseTitle}</h2>
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
      </CardHeader>
      <CardContent className="space-y-4">
        {positionTitle && (
          <div className="flex items-center space-x-2">
            <BriefcaseIcon className="h-6 w-6" />
            <span>{positionTitle}</span>
          </div>
        )}
        {fieldDescription && (
          <div className="flex items-center space-x-2">
            <BuildingIcon className="h-6 w-6" />
            <span>{fieldDescription}</span>
          </div>
        )}
        {compareDescription && (
          <div className="flex items-center space-x-2">
            <LightbulbIcon className="h-6 w-6" />
            <span>{compareDescription}</span>
          </div>
        )}
        {topDescription && (
          <div>
            <h3 className="mb-2 font-semibold">Programme Description:</h3>
            <div dangerouslySetInnerHTML={{ __html: topDescription }} />
          </div>
        )}
        {responsibilitiesDescription && (
          <div>
            <h3 className="mb-2 font-semibold">Responsibilities:</h3>
            <div
              dangerouslySetInnerHTML={{ __html: responsibilitiesDescription }}
            />
          </div>
        )}
        {requirementsDescription && (
          <div>
            <h3 className="mb-2 font-semibold">Requirements:</h3>
            <div
              dangerouslySetInnerHTML={{ __html: requirementsDescription }}
            />
          </div>
        )}
      </CardContent>
      {courseTitle && qualificationUrl && (
        <CardFooter>
          <Button onClick={apply} className="w-full">
            Apply
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
