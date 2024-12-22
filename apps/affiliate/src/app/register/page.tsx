import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { organizationId, profileId, userId } from "@/context/constants";
import getDataRequest from "@/snippets/getDataRequest";
import getGQLRequest from "@/snippets/getGQLRequest";

import { Alert } from "../../../../../packages/ui/src/alert";
import { Button } from "../../../../../packages/ui/src/button";

const RegisterAffiliate: React.FC = () => {
  const router = useRouter();
  const [responses, setResponses] = useState<{ terms: string }[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      await getDataRequest(
        `/affiliate-settings?organization=${organizationId}`,
        setResponses,
      );
      const { affiliates } = await getGQLRequest({
        endpoint: "affiliates",
        fields: "id,profile{isAffiliate}",
        where: `profile:{id:${profileId}}`,
      });
      if (affiliates.length) {
        if (affiliates[0].profile.isAffiliate) {
          setSuccess("You are already an affiliate.");
        } else {
          setSuccess("Your request is being processed.");
        }
        setDisabled(true);
      }
    };

    fetchData();
  }, []);

  const Apply = async () => {
    const { affiliates } = await getGQLRequest({
      endpoint: "affiliates",
      fields: "id",
      where: `user:{id:${userId}}`,
    });

    if (affiliates.length) {
      setError("You Already Applied.");
    } else {
      await api.post("/affiliates", {
        user: { id: parseInt(userId) },
        profile: { id: parseInt(profileId) },
      });
      setSuccess("Thank You For Applying!");
    }
  };

  return (
    <>
      <div className="desktop:h-full laptop:h-full mobile:h-full no-scrolly overflow-scroll p-2">
        <div className="bg-compBg desktop:mt-2 laptop:mt-2 mobile:mt-2 no-scrolly rounded-lg p-2 drop-shadow-md">
          <div className="mb-2 flex items-center justify-between pb-2">
            <div className="text-textColor text-xl">
              Affiliate Program - Terms and Conditions
            </div>
            <div className="">
              <div className="flex justify-center">
                <div className="flex flex-row pt-3">
                  <Button
                    label="Back"
                    color="bg-themeColorMain"
                    onClickFunction={() => router.back()}
                  />
                </div>
              </div>
            </div>
          </div>
          {responses.length ? (
            <div dangerouslySetInnerHTML={{ __html: responses[0].terms }} />
          ) : (
            <></>
          )}
          {!disabled ? (
            <div className="flex justify-center">
              <div className="flex flex-row pt-3">
                <Button
                  label="Cancel"
                  color="bg-themeColorMain"
                  onClickFunction={() => router.back()}
                />
                <Button
                  label="Apply"
                  color="bg-themeColorMain"
                  onClickFunction={Apply}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="flex flex-row pt-3">
                <Button
                  label="Back"
                  color="bg-themeColorMain"
                  onClickFunction={() => router.back()}
                />
              </div>
            </div>
          )}
          <div className="mt-3 justify-center">
            <Alert error={error} success={success} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterAffiliate;
