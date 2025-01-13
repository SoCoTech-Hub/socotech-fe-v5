import React, { useEffect, useState } from "react";
import Link from "next/link";

import { profileId } from "@acme/snippets/context/constants";
import getSelectedBursary from "@acme/snippets/functions/Bursary/getSelectedBursary";
import BursaryListing from "@acme/ui/Bursaries/listing";
import BursaryPost from "@acme/ui/Bursaries/Post";
import { Button } from "@acme/ui/button";

interface Bursary {
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

interface BursaryCategory {
  id: string;
  name: string;
  color?: string;
  icon?: string;
  iconSvg?: string;
}

interface BursaryProps {
  universityId: string;
  bursariesArr: Bursary[];
  bursaryCategory: BursaryCategory;
}

const Bursary = ({
  // universityId,
  bursariesArr,
  bursaryCategory,
}: BursaryProps) => {
  const [bursaries] = useState<Bursary[]>(bursariesArr ? bursariesArr : []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Bursary | {}>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [numberOfApplications, setNumberOfApplications] = useState<number>(0);

  useEffect(() => {
    const fetchSelectedBursary = async () => {
      setLoading(true);
      setSelected({});
      setSelectedId(null);
      if (bursaries.length) {
        let resultData = await getSelectedBursary({
          bursaryId: bursaries[0].id,
          selectedId: selectedId || "",
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
    fetchSelectedBursary();
  }, [bursaries]);

  useEffect(() => {
    const fetchSelectedBursary = async () => {
      setLoading(true);
      if (bursaries.length) {
        let resultData = await getSelectedBursary({
          bursaryId: bursaries[0].id,
          selectedId: selectedId || "",
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
    fetchSelectedBursary();
  }, [selectedId]);

  return (
    <div className="col row">
      <div className="w-full">
        <div>
          <div className="mobile:p-2 bg-themeColorMain desktop:py-2 laptop:py-2 grid place-content-center rounded-lg text-xl text-black">
            {bursaryCategory?.name}
          </div>
        </div>
        <div className="my-4 flex justify-end font-bold">
          <Link href={`/bursaries`}>
            <Button className="bg-primary">Back</Button>
          </Link>
        </div>

        {bursaries?.length > 0 && (
          <div className="bg-compBg shadow-menu flex divide-x rounded-lg p-3">
            <div
              className="desktop:w-1/3 laptop:w-1/3 mobile:hidden no-scrolly grid grid-cols-1 space-y-2 divide-y shadow-inner"
              id="scrollplz"
            >
              {bursaries.map((item) => (
                <div key={item.id}>
                  <BursaryListing
                    id={item.id}
                    courseTitle={item.name}
                    courseCompanyName={bursaryCategory?.name}
                    courseDescription={item.whoQualifies}
                    applicationFeatureImage={
                      bursaryCategory?.icon
                        ? bursaryCategory?.icon
                        : "/user/Icon_School.png"
                    }
                    bgColor={bursaryCategory?.color}
                    iconSvg={bursaryCategory?.iconSvg}
                    setSelection={setSelectedId}
                  />
                </div>
              ))}
            </div>
            <div
              className="mobile:w-full desktop:hidden laptop:hidden no-scrolly grid grid-cols-1 space-y-2 divide-y"
              id="scrollplz"
            >
              {bursaries.map((item) => (
                <div key={item.id}>
                  <BursaryListing
                    id={item.id}
                    courseTitle={item.name}
                    courseCompanyName={bursaryCategory?.name}
                    courseDescription={item.whoQualifies}
                    applicationFeatureImage={
                      bursaryCategory?.icon
                        ? bursaryCategory?.icon
                        : "/user/Icon_School.png"
                    }
                    bgColor={bursaryCategory?.color}
                    iconSvg={bursaryCategory?.iconSvg}
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
                <BursaryPost
                  loading={loading}
                  courseTitle={(selected as Bursary).name}
                  companyDescription={bursaryCategory?.name}
                  timePosted={(selected as Bursary).updated_at}
                  open={(selected as Bursary).open}
                  close={(selected as Bursary).close}
                  whoQualifies={(selected as Bursary).whoQualifies}
                  application={(selected as Bursary).application}
                  particulars={(selected as Bursary).particulars}
                  notes={(selected as Bursary).note}
                  value={(selected as Bursary).value}
                  iconSvg={bursaryCategory?.iconSvg}
                  bgColor={bursaryCategory?.color}
                  applicationFeatureImage={
                    bursaryCategory?.icon
                      ? bursaryCategory?.icon
                      : "/user/Icon_School.png"
                  }
                  numberOfApplicants={numberOfApplications.toString()}
                  bursaryUrl={(selected as Bursary).url}
                  bursaryId={(selected as Bursary).id}
                  profileId={profileId}
                />
              )}
            </div>
          </div>
        )}

        {bursaries?.length === 0 && !loading && (
          <div className="align-middle">No Bursaries found</div>
        )}
      </div>
    </div>
  );
};

export default Bursary;
