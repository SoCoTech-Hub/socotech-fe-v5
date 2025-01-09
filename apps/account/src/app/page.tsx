"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { isPaying } from "@acme/snippets/context/constants";
import {
  FetchSubscription,
  UpsertSubscription,
} from "@acme/snippets/functions/account/subscription";
import { PopupAlert } from "@acme/ui/PopupAlert/index";
import Cover from "@acme/ui/profile/cover";
import { Switch } from "@acme/ui/switch";

interface Subscription {
  id: string;
  newsletterActive: boolean;
  smsActive: boolean;
}

const AccountSettings: React.FC = () => {
  const { basePath } = useRouter();
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
      try {
        const subscriptions = await FetchSubscription();
        if (subscriptions.length) {
          setSubscriptions(subscriptions[0]);
          setNewsLetterActive(subscriptions[0].newsletterActive);
          setSmsActive(subscriptions[0].smsActive);
        }
      } catch (error) {
        setError("Failed to fetch subscriptions. Please try again later.");
      }
    };
    fetchSubscriptions();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Replace with actual API call for password reset
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API delay
      setSuccessPwd("Password reset link sent successfully.");
      setErrorPwd("");
    } catch (error) {
      setErrorPwd("Failed to request password reset. Please try again.");
      setSuccessPwd("");
    } finally {
      setLoading(false);
    }
  };

  const updateNewsletter = async ({
    activeNewsLetter,
    activeSms,
  }: {
    activeNewsLetter: boolean;
    activeSms: boolean;
  }) => {
    try {
      const updated = await UpsertSubscription({
        newsletterActive: activeNewsLetter,
        smsActive: activeSms,
      });
      setSubscriptions(updated);
      setNewsLetterActive(updated.newsletterActive);
      setSmsActive(updated.smsActive);
      setSuccess("Preferences updated successfully.");
      setError("");
    } catch (error) {
      setError("Failed to update preferences. Please try again.");
      setSuccess("");
    }
  };

  return (
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
              <button
                className="bg-themeColorMain buttonHover cursor-pointer rounded-lg p-2 text-center text-black shadow-md"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Loading..." : "Request Password Update"}
              </button>
              <PopupAlert
                message={error ? error : success}
                variant={error ? "destructive" : "success"}
                visible={!!(error || success)}
              />
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
          <div className="text-textColor mt-2 text-sm">
            <div className="font-bold">Newsletter Subscription</div>
            <span>
              Subscribe/Unsubscribe: Receive or stop receiving newsletters with
              updates and announcements.
            </span>
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
              }`}
            />
          </div>
          <div className="text-textColor mt-4 text-sm">
            <div className="font-bold">SMS Notifications</div>
            <span>
              {smsActive
                ? "Unsubscribe: Stop receiving SMS notifications."
                : "Subscribe: Receive SMS notifications."}
            </span>
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
              }`}
            />
          </div>
          <PopupAlert
            message={error ? error : success}
            variant={error ? "destructive" : "success"}
            visible={!!(error || success)}
          />
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
              data, including progress and saved content. This action cannot be
              undone.
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
  );
};

export default AccountSettings;
