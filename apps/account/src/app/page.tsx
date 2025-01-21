"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { UpdateImages, UploadImages } from "@acme/snippets"; //TODO: not sure if correct
import { api } from "@acme/snippets/api/api";
import {
  Banner,
  email,
  isPaying,
  profileId,
  ProfilePic,
  userId,
  userName,
} from "@acme/snippets/context/constants";
import {
  FetchSubscription,
  UpsertSubscription,
} from "@acme/snippets/functions/account/subscription";
import { Cover, PopupAlert, Switch } from "@acme/ui";

const AccountSettings: React.FC = () => {
  const [newsLetterActive, setNewsLetterActive] = useState<boolean>(true);
  const [success, setSuccess] = useState<string>("");
  const [smsActive, setSmsActive] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const { subscriptions } = await FetchSubscription();
        if (subscriptions.length) {
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
    setError("");
    try {
      await api.POST("/auth/forgot-password", { email: email });
      setSuccess("Password reset link sent successfully.");
    } catch (error) {
      setError("Failed to request password reset. Please try again.");
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
      const updatedSubscription = await UpsertSubscription({
        newsletterActive: activeNewsLetter,
        smsActive: activeSms,
      });

      if (updatedSubscription) {
        setNewsLetterActive(updatedSubscription.newsletterActive);
        setSmsActive(updatedSubscription.smsActive);
        setSuccess("Preferences updated successfully.");
      }
    } catch (error) {
      setError("Failed to update preferences. Please try again.");
    } finally {
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
    }
  };

  return (
    <div className="mb-24 mt-1.5 w-full">
      <div className="pt-3 pl-3 pr-3 mb-4 rounded-lg bg-compBg shadow-menu">
        <Cover
          user={{ id: userId, profile: { id: profileId } }}
          avatarImage={ProfilePic}
          bannerImage={Banner}
          name={userName}
          updateImages={UpdateImages}
          uploadImage={UploadImages}
        />
        <div className="pb-3 mt-4 ml-2 mr-2">
          <hr className="bg-compBg" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-compBg shadow-menu">
          <div className="flex flex-row">
            <div className="text-lg text-themeColorMain">Password Update</div>
          </div>
          <div className="pt-2">
            <div className="mb-2 text-sm text-textColor">
              If you've forgotten your password or want to update it, you can
              reset it here.
            </div>
            <div className="w-1/2">
              <button
                className="p-2 text-center text-black rounded-lg shadow-md cursor-pointer bg-themeColorMain buttonHover"
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
        <div className="p-4 rounded-lg bg-compBg shadow-menu">
          <div className="flex flex-row">
            <div className="text-lg text-themeColorMain">
              Communication Preferences
            </div>
          </div>
          <div className="mt-2 text-sm text-textColor">
            <div className="font-bold">Newsletter Subscription</div>
            <span>
              Subscribe/Unsubscribe: Receive or stop receiving newsletters with
              updates and announcements.
            </span>
            <Switch
              checked={newsLetterActive}
              onCheckedChange={(checked: boolean) =>
                updateNewsletter({
                  activeNewsLetter: checked,
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
          <div className="mt-4 text-sm text-textColor">
            <div className="font-bold">SMS Notifications</div>
            <span>
              {smsActive
                ? "Unsubscribe: Stop receiving SMS notifications."
                : "Subscribe: Receive SMS notifications."}
            </span>
            <Switch
              checked={smsActive}
              onCheckedChange={(checked: boolean) =>
                updateNewsletter({
                  activeNewsLetter: newsLetterActive,
                  activeSms: checked,
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
        {isPaying === "1" && (
          <div className="p-4 rounded-lg bg-compBg shadow-menu">
            <div className="flex flex-row">
              <div className="text-lg text-themeColorMain">
                Billing Information
              </div>
            </div>
            <div className="mt-2">
              <div className="mb-4 text-sm text-textColor">
                Billing information button that takes you to your billing
                information.
              </div>
              <Link scroll={false} href="/billing">
                <a className="bg-themeColorMain my-4 w-36 cursor-pointer rounded-md p-2.5 text-center text-black shadow-md">
                  Billing information
                </a>
              </Link>
            </div>
          </div>
        )}

        {/* Delete Account */}
        <div className="p-4 rounded-lg bg-compBg shadow-menu">
          <div className="flex flex-row">
            <div className="text-lg text-red-600">Delete Account</div>
          </div>
          <div className="mt-2">
            <div className="mb-4 text-sm text-textColor">
              Warning: Deleting your account will permanently remove all your
              data, including progress and saved content. This action cannot be
              undone.
            </div>
            <Link scroll={false} href="/delete">
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
