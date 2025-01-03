import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { organizationId, profileId, userId } from "@/context/constants";

import { FetchIsAffiliate } from "@acme/snippets/functions/affiliate/affiliate";
import { FetchAffiliateSettingTerms } from "@acme/snippets/functions/affiliate/affiliateSettings";
import { Alert } from "@acme/ui/alert";
import { Button } from "@acme/ui/button";

const RegisterAffiliate = () => {
  const router = useRouter();
  const [affiliate, setAffiliate] = useState<{
    id?: string;
    profile?: { isAffiliate: boolean };
  }>({});
  const [responses, setResponses] = useState<{ terms: string }[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const terms = await FetchAffiliateSettingTerms(organizationId);
      setResponses(terms);

      const { affiliates } = await FetchIsAffiliate(profileId);
      if (affiliates.length) {
        setAffiliate(affiliates[0]);
      }

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
    if (affiliate.id) {
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
