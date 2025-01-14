import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { api } from "@acme/snippets/api/api";
import {
  // organizationId,
  profileId,
  userId,
} from "@acme/snippets/context/constants";
import { FetchIsAffiliate } from "@acme/snippets/functions/affiliate/affiliate";
// import { FetchAffiliateSettingTerms } from "@acme/snippets/functions/affiliate/affiliateSettings";
import { Button } from "@acme/ui";
import { PopupAlert } from "@acme/ui";

const RegisterAffiliate = () => {
  const router = useRouter();
  const [affiliate, setAffiliate] = useState<{
    id?: string;
    profile?: { isAffiliate: boolean };
  }>({});
  const [responses, _setResponses] = useState<{ terms: string }[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      // const terms = await FetchAffiliateSettingTerms(organizationId || "1");
      // setResponses(terms.attributes);//TODO: Fix this

      const affiliates = await FetchIsAffiliate(profileId || "");
      if (affiliates) {
        setAffiliate(affiliates);
        if (affiliates.profile.isAffiliate) {
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
      await api.POST("/affiliates", {
        user: { id: parseInt(userId || "") },
        profile: { id: parseInt(profileId || "") },
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
                  <Button className="bg-primary" onClick={() => router.back()}>
                    Back
                  </Button>
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
                <Button className="bg-primary" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button className="bg-primary" onClick={Apply}>
                  Apply
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="flex flex-row pt-3">
                <Button className="bg-primary" onClick={() => router.back()}>
                  Back
                </Button>
              </div>
            </div>
          )}
          <div className="mt-3 justify-center">
            <PopupAlert
              message={error ? error : success}
              variant={error ? "destructive" : "success"}
              visible={!!(error || success)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterAffiliate;
