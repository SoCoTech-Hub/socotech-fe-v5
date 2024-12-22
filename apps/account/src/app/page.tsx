import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import {
  email,
  isPaying,
  organizationId,
  profileId,
} from "@/context/constants";
import getGQLRequest from "@/snippets/getGQLRequest";

import Alert from "@acme/ui/Alert";
import Cover from "@acme/ui/Cover";
import { Switch } from "@acme/ui/switch";

interface Subscription {
  id: string;
  newsletterActive: boolean;
  smsActive: boolean;
}

const AccountSettings: React.FC = () => {
  const { basePath } = router;
  const [subscriptions, setSubscriptions] = useState<Subscription | null>(null);
  const [newsLetterActive, setNewsLetterActive] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>("");
  const [smsActive, setSmsActive] = useState<boolean>(true);
  const [successPwd, setSuccessPwd] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [errorPwd, setErrorPwd] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const { subscriptions } = await getGQLRequest({
        endpoint: "subscriptions",
        fields: "id,newsletterActive,smsActive",
        where: `profiles:{id:${profileId}},organization:{id:${organizationId}}`,
      });

      if (subscriptions.length) {
        setSubscriptions(subscriptions[0]);
        setNewsLetterActive(subscriptions[0].newsletterActive);
        setSmsActive(subscriptions[0].smsActive);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <>
      <div className="mb-24 mt-1.5 w-full">
        <div className="bg-compBg shadow-menu mb-4 rounded-lg pl-3 pr-3 pt-3">
          <Cover edit="true" />
          <div className="ml-2 mr-2 mt-4 pb-3">
            <hr className="bg-compBg" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-compBg shadow-menu rounded-lg p-4">
            <div className="flex flex-row">
              <div className="text-themeColorMain text-lg">Password Update</div>
            </div>
            <div className="pt-2">
              <div className="text-textColor mb-2 text-sm">
                If you've forgotten your password or want to update it, you can
                reset it here.
              </div>
              <div className="w-1/2">
                <div className="space-y-1">
                  <button
                    className="bg-themeColorMain buttonHover cursor-pointer rounded-lg p-2 text-center text-black shadow-md"
                    onClick={(e) => handleSubmit(e)}
                  >
                    {loading ? "Loading" : "Request Password Update"}
                  </button>
                  <Alert error={errorPwd} success={successPwd} />
                </div>
              </div>
            </div>
          </div>
          {/* Communication Preferences */}
          <div className="bg-compBg shadow-menu rounded-lg p-4">
            <div className="flex flex-row">
              <div className="text-themeColorMain text-lg">
                Communication Preferences
              </div>
            </div>
            {/* Newsletter */}
            <div className="text-textColor mt-2 text-sm">
              <div className="font-bold">Newsletter Subscription</div>
              <span id="comments-description">
                Subscribe/Unsubscribe: Receive or stop receiving newsletters
                with updates and announcements.
              </span>
              <div className="flex space-y-1">
                <div className="mb-4 mt-3 h-6 items-center">
                  <Switch
                    checked={newsLetterActive}
                    onChange={(e) =>
                      updateNewsletter({
                        activeNewsLetter: e,
                        activeSms: smsActive,
                      })
                    }
                    className={`${
                      newsLetterActive
                        ? "bg-themeColorMain"
                        : "bg-themeColorSecondary"
                    } relative inline-flex h-6 w-11 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      className={`${
                        newsLetterActive ? "translate-x-5" : "translate-x-0"
                      } bg-compBg pointer-events-none inline-block h-5 w-5 transform rounded-full shadow transition`}
                    />
                  </Switch>
                </div>
              </div>
            </div>
            {/* SMS Notifications */}
            <div className="text-textColor text-sm">
              <div className="font-bold">SMS Notifications</div>
              <span id="comments-description">
                {smsActive
                  ? "Unsubscribe: Stop receiving"
                  : "Subscribe: Receive"}{" "}
                SMS notifications from Topic.
              </span>
              <div className="flex space-y-1">
                <div className="mt-3 h-6 items-center">
                  <Switch
                    checked={smsActive}
                    onChange={(e) =>
                      updateNewsletter({
                        activeNewsLetter: newsLetterActive,
                        activeSms: e,
                      })
                    }
                    className={`${
                      smsActive ? "bg-themeColorMain" : "bg-themeColorSecondary"
                    } relative inline-flex h-6 w-11 cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      className={`${
                        smsActive ? "translate-x-5" : "translate-x-0"
                      } bg-compBg pointer-events-none inline-block h-5 w-5 transform rounded-full shadow transition`}
                    />
                  </Switch>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <Alert error={error} success={success} />
            </div>
          </div>
          {/* Billing Information */}
          {isPaying === 1 && (
            <div className="bg-compBg shadow-menu rounded-lg p-4">
              <div className="flex flex-row">
                <div className="text-themeColorMain text-lg">
                  Billing Information
                </div>
              </div>
              <div className="mt-2">
                <div className="text-textColor mb-4 text-sm">
                  Billing information button that takes you to your billing
                  information.
                </div>
                <Link href="/billing">
                  <a className="bg-themeColorMain my-4 w-36 cursor-pointer rounded-md p-2.5 text-center text-black shadow-md">
                    Billing information
                  </a>
                </Link>
              </div>
            </div>
          )}
          {/* Delete Account */}
          <div className="bg-compBg shadow-menu rounded-lg p-4">
            <div className="flex flex-row">
              <div className="text-lg text-red-600">Delete Account</div>
            </div>
            <div className="mt-2">
              <div className="text-textColor mb-4 text-sm">
                Warning: Deleting your account will permanently remove all your
                data, including progress and saved content. This action cannot
                be undone. You will have to re-register and start a new account
                on Topic.
              </div>
              <Link href="/unsubscribe">
                <a className="w-36 cursor-pointer rounded-md bg-red-700 p-2.5 text-center font-bold text-black shadow-md hover:bg-red-600">
                  Delete My Account
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
