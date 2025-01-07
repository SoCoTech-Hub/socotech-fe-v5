import React, { useEffect, useState } from "react";
import getSelectedQualification from "@/snippets/user/getSelectedQualification";
import { Scrollbars } from "react-custom-scrollbars";

import { profileId } from "@acme/snippets/context/constants";

import { ApplicationsListing } from "../../../../../../packages/ui/src/applications/listing";
import { ApplicationsPost } from "../../../../../../packages/ui/src/applications/Post";
import { Button } from "../../../../../../packages/ui/src/button";

//TODO:fix components
interface Qualification {
  id: string;
  name: string;
  institution: string;
  shortDescription?: string;
  university?: { logo?: { url: string } };
  degree?: string;
  subjects?: { id: string; name: string }[];
  url?: string;
  openDate?: string;
  closeDate?: string;
  programmDescription?: string;
  requirements?: string;
  created_at?: string;
  updated_at?: string;
}

interface Faculty {
  id: string;
  name: string;
  color?: string;
  svgIcon?: string;
  icon?: { id: string; url: string };
}

interface ApplicationProps {
  qualificationsArr: Qualification[];
  faculty: Faculty;
  universityId: string;
}

const Application: React.FC<ApplicationProps> = ({
  qualificationsArr,
  faculty,
  universityId,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Partial<Qualification>>({});
  const [numberOfApplications, setNumberOfApplications] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSelectedQualification = async () => {
      setLoading(true);
      setSelected({});
      setSelectedId(null);
      if (qualificationsArr.length) {
        const resultData = await getSelectedQualification({
          qualificationId: qualificationsArr[0].id,
          selectedId,
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
  }, [qualificationsArr]);

  useEffect(() => {
    const fetchSelectedIdData = async () => {
      setLoading(true);
      if (qualificationsArr.length) {
        const resultData = await getSelectedQualification({
          qualificationId: qualificationsArr[0].id,
          selectedId,
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
    fetchSelectedIdData();
  }, [selectedId]);

  return (
    <div className="col row">
      <div className="w-full">
        <div>
          <div className="mobile:p-2 bg-themeColorMain desktop:py-2 laptop:py-2 grid place-content-center rounded-lg text-xl text-black">
            {faculty?.name}
          </div>
        </div>
        <div className="my-4 flex w-full justify-end">
          <Button
            label="Back"
            color="bg-themeColorMain"
            link={`/applications/${universityId}`}
          />
        </div>
        {qualificationsArr?.length > 0 && (
          <div className="bg-compBg shadow-menu flex divide-x rounded-lg p-3">
            <div
              className="desktop:w-1/3 laptop:w-1/3 mobile:hidden no-scrolly grid grid-cols-1 space-y-2 divide-y shadow-inner"
              id="scrollplz"
            >
              <Scrollbars
                style={{ height: "600px" }}
                renderThumbVertical={({ style, ...props }) => (
                  <div
                    {...props}
                    style={{ ...style, backgroundColor: "#D6F379" }}
                  />
                )}
              >
                {qualificationsArr.map((item) => (
                  <div key={item.id}>
                    <ApplicationsListing
                      id={item.id}
                      courseTitle={item.name}
                      courseCompanyName={item.institution}
                      courseDescription={item.shortDescription}
                      applicationFeatureImage={
                        faculty?.icon || "/user/Icon_School.png"
                      }
                      bgColor={faculty?.color}
                      svgIcon={faculty?.svgIcon}
                      setSelection={setSelectedId}
                    />
                  </div>
                ))}
              </Scrollbars>
            </div>
            <div
              className="desktop:w-2/3 mobile:w-1/2 laptop:w-2/3 mobile:hidden no-scrolly"
              id="scrollplz"
            >
              <Scrollbars
                style={{ height: "600px" }}
                renderThumbVertical={({ style, ...props }) => (
                  <div
                    {...props}
                    style={{ ...style, backgroundColor: "#D6F379" }}
                  />
                )}
              >
                {selected && (
                  <ApplicationsPost
                    loading={loading}
                    qualificationUrl={selected.url}
                    qualificationId={selected.id}
                    profileId={profileId}
                    courseTitle={selected.name}
                    companyDescription={selected.institution}
                    timePosted={selected.created_at}
                    numberOfApplicants={numberOfApplications}
                    positionTitle={
                      selected.duration && selected.degree
                        ? `${selected.duration} - ${selected.degree}`
                        : ""
                    }
                    fieldDescription={
                      selected.openDate && selected.closeDate
                        ? `${selected.openDate} - ${selected.closeDate}`
                        : "Date: TBC"
                    }
                    topDescription={selected.programmDescription}
                    requirementsDescription={selected.requirements}
                    applicationFeatureImage={
                      faculty?.icon || "/user/Icon_School.png"
                    }
                    bgColor={faculty?.color}
                    svgIcon={faculty?.svgIcon}
                  />
                )}
              </Scrollbars>
            </div>
          </div>
        )}
        {qualificationsArr?.length === 0 && !loading && (
          <div align="center" className="text-white">
            No Qualifications found
          </div>
        )}
      </div>
    </div>
  );
};

export default Application;
