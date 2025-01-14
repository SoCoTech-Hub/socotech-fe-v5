import React, { useEffect, useState } from "react";
import Link from "next/link";

import { profileId } from "@acme/snippets/context/constants";
import getSelectedQualification from "@acme/snippets/functions/qualificationResponses/getSelectedQualification";
import { Button } from "@acme/ui/button";
import { QualificationListing } from "@acme/ui/Qualifications/listing";
import { QualificationPost } from "@acme/ui/Qualifications/Post";

interface Qualification {
  id: string;
  name: string;
  whoQualifies?: string;
  open?: string;
  close?: string;
  application?: string;
  particulars?: string;
  value?: string;
  note?: string;
  created_at?: string;
  updated_at?: string;
  url?: string;
}

interface QualificationCategory {
  id: string;
  name: string;
  color?: string;
  icon?: string;
  iconSvg?: string;
}

interface QualificationProps {
  universityId: string;
  qualificationsArr: Qualification[];
  qualificationCategory: QualificationCategory;
}

const Qualification = ({
  universityId,
  qualificationsArr,
  qualificationCategory,
}: QualificationProps) => {
  const [qualifications] = useState<Qualification[]>(
    qualificationsArr ? qualificationsArr : [],
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Qualification | {}>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [numberOfApplications, setNumberOfApplications] = useState<number>(0);

  useEffect(() => {
    const fetchSelectedQualification = async () => {
      setLoading(true);
      setSelected({});
      setSelectedId(null);
      if (qualifications.length) {
        let resultData = await getSelectedQualification({
          qualificationId: qualifications[0].id,
          selectedId: selectedId,
        });
        setSelected(resultData.selected);
        setNumberOfApplications(resultData.numberOfApplicants);
      } else {
        setSelected({});
        setNumberOfApplications(0);
        setSelectedId(null);
      }
      setLoading(false);
    };
    fetchSelectedQualification();
  }, [qualifications]);

  useEffect(() => {
    const fetchSelectedQualification = async () => {
      setLoading(true);
      if (qualifications.length) {
        let resultData = await getSelectedQualification({
          qualificationId: qualifications[0].id,
          selectedId: selectedId,
        });
        setSelected(resultData.selected);
        setNumberOfApplications(resultData.numberOfApplicants);
      } else {
        setSelected({});
        setNumberOfApplications(0);
        setSelectedId(null);
      }
      setLoading(false);
    };
    fetchSelectedQualification();
  }, [selectedId]);

  return (
    <div className="col row">
      <div className="w-full">
        <div>
          <div className="mobile:p-2 bg-themeColorMain desktop:py-2 laptop:py-2 grid place-content-center rounded-lg text-xl text-black">
            {qualificationCategory?.name}
          </div>
        </div>
        <div className="my-4 flex justify-end font-bold">
          <Link href={`/qualifications`}>
            <Button className="bg-primary">Back</Button>
          </Link>
        </div>

        {qualifications?.length > 0 && (
          <div className="bg-compBg shadow-menu flex divide-x rounded-lg p-3">
            <div
              className="desktop:w-1/3 laptop:w-1/3 mobile:hidden no-scrolly grid grid-cols-1 space-y-2 divide-y shadow-inner"
              id="scrollplz"
            >
              {qualifications.map((item) => (
                <div key={item.id}>
                  <QualificationListing
                    id={item.id}
                    courseTitle={item.name}
                    courseCompanyName={qualificationCategory?.name}
                    courseDescription={item.whoQualifies}
                    applicationFeatureImage={
                      qualificationCategory?.icon
                        ? qualificationCategory?.icon
                        : "/user/Icon_School.png"
                    }
                    bgColor={qualificationCategory?.color}
                    iconSvg={qualificationCategory?.iconSvg}
                    setSelection={setSelectedId}
                  />
                </div>
              ))}
            </div>
            <div
              className="mobile:w-full desktop:hidden laptop:hidden no-scrolly grid grid-cols-1 space-y-2 divide-y"
              id="scrollplz"
            >
              {qualifications.map((item) => (
                <div key={item.id}>
                  <QualificationListing
                    id={item.id}
                    courseTitle={item.name}
                    courseCompanyName={qualificationCategory?.name}
                    courseDescription={item.whoQualifies}
                    applicationFeatureImage={
                      qualificationCategory?.icon
                        ? qualificationCategory?.icon
                        : "/user/Icon_School.png"
                    }
                    bgColor={qualificationCategory?.color}
                    iconSvg={qualificationCategory?.iconSvg}
                    setSelection={setSelectedId}
                  />
                </div>
              ))}
            </div>
            <div
              className="desktop:w-2/3 mobile:w-1/2 laptop:w-2/3 mobile:hidden no-scrolly"
              id="scrollplz"
            >
              {selected && (
                <QualificationPost
                  loading={loading}
                  courseTitle={(selected as Qualification).name}
                  companyDescription={qualificationCategory?.name}
                  timePosted={(selected as Qualification).updated_at}
                  open={(selected as Qualification).open}
                  close={(selected as Qualification).close}
                  whoQualifies={(selected as Qualification).whoQualifies}
                  application={(selected as Qualification).application}
                  particulars={(selected as Qualification).particulars}
                  notes={(selected as Qualification).note}
                  value={(selected as Qualification).value}
                  iconSvg={qualificationCategory?.iconSvg}
                  bgColor={qualificationCategory?.color}
                  applicationFeatureImage={
                    qualificationCategory?.icon
                      ? qualificationCategory?.icon
                      : "/user/Icon_School.png"
                  }
                  numberOfApplicants={numberOfApplications}
                  qualificationUrl={(selected as Qualification).url}
                  qualificationId={(selected as Qualification).id}
                  profileId={profileId}
                />
              )}
            </div>
          </div>
        )}

        {qualifications?.length === 0 && !loading && (
          <div className="align-middle">No Qualifications found</div>
        )}
      </div>
    </div>
  );
};

export default Qualification;
