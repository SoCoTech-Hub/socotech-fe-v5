"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { ApiTransactionTransaction } from "@acme/api/graphql";
import { api } from "@acme/snippets/api/api";
import {
  Banner,
  organizationId,
  profileId,
  ProfilePic,
  uniqueId,
  userId,
  userName,
} from "@acme/snippets/context/constants";
import { FetchOrganizationMerchantId } from "@acme/snippets/functions/account/organization";
import {
  FetchProfile,
  UpdateImages,
  UploadImages,
} from "@acme/snippets/functions/account/profile";
import {
  FetchTransactionByPaymentId,
  UpsertTransaction,
} from "@acme/snippets/functions/account/transaction";
import { convertUTCToLocal } from "@acme/snippets/functions/convertUtcToLocal";
import { PauseSubscription } from "@acme/snippets/functions/payfast/pauseSubscription";
import UnpauseSubscription from "@acme/snippets/functions/payfast/unpauseSubscription";
import { Button, Cover, InputField, Modal, PopupAlert } from "@acme/ui";

interface Profile {
  id: string;
  cancelDate: string | null;
  isPaying: boolean;
  isPayingDate: string;
}

interface Organization {
  merchantId: string;
}

const Billing: React.FC = () => {
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<
    ApiTransactionTransaction[] | null
  >(null);
  const [company, setCompany] = useState<string>("");
  const [vatNr, setVatNr] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [addressLine1, setAddressLine1] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [additionalInformation, setAdditionalInformation] =
    useState<string>("");
  const [cellNr, setCellNr] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [org, setOrg] = useState<Organization>({ merchantId: "" });

  useEffect(() => {
    const fetchData = async () => {
      if (uniqueId && organizationId) {
        const trans = await FetchTransactionByPaymentId(uniqueId);
        if (trans && trans.transactions && trans.transactions.length > 0) {
          const firstTransaction = trans.transactions[0];
          setTransactions(trans.transactions);
          setCompany(firstTransaction.attributes.company);
          setVatNr(firstTransaction.attributes.vatNr);
          setFirstName(firstTransaction.attributes.firstName);
          setLastName(firstTransaction.attributes.lastName);
          setEmail(firstTransaction.attributes.email);
          setAddressLine1(firstTransaction.attributes.addressLine1);
          setPostalCode(firstTransaction.attributes.postalCode);
          setAdditionalInformation(
            firstTransaction.attributes.additionalInformation,
          );
          setCellNr(firstTransaction.attributes.cellnr);
        }

        const prof = await FetchProfile(profileId || "");
        if (prof) {
          setProfile(prof.profile);
        }

        const merch = await FetchOrganizationMerchantId();
        setOrg(merch.organization);
      }
    };

    fetchData();
  }, [uniqueId]);

  const cancelSub = async () => {
    const date = new Date();
    if (transactions?.[0]?.attributes?.signature) {
      await PauseSubscription(transactions[0].attributes.signature, org);
    }

    await api.PUT(`/profiles/${profileId}`, {
      cancelDate: date.toISOString().split("T")[0],
    });

    if (profile) {
      setProfile({
        ...profile,
        cancelDate: date.toISOString().split("T")[0],
      });
    } else {
      setError("Profile data is missing");
    }

    setIsOpen(false);
  };

  const unCancelSub = async () => {
    if (transactions?.[0]?.attributes?.signature) {
      await UnpauseSubscription(transactions[0].attributes.signature);
    }

    await api.PUT(`/profiles/${profileId}`, {
      cancelDate: null,
    });

    setIsOpen(false);

    if (profile) {
      setProfile({
        ...profile,
        cancelDate: null, // Match the expected type of `cancelDate`
      });
    } else {
      console.error("Profile data is missing. Unable to update cancelDate.");
    }
  };

  const save = async () => {
    setSuccess("");
    setError("");

    const updatedData: Partial<ApiTransactionTransaction["attributes"]> = {
      ...(company && { company }),
      ...(vatNr && { vatNr }),
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email && { email }),
      ...(addressLine1 && { addressLine1 }),
      ...(postalCode && { postalCode }),
      ...(cellNr && { cellNr }),
      ...(additionalInformation && { additionalInformation }),
    };

    try {
      if (transactions?.[0]?.id) {
        const res = await UpsertTransaction({
          id: transactions?.[0]?.id,
          data: updatedData,
        });

        if (!res) {
          setError("Something went wrong");
        } else {
          setSuccess(`Billing Information ${res.message}`);
        }
      }
    } catch (err) {
      setError("Failed to save transaction.");
      console.error(err);
    }
  };

  const isPayingDate = profile?.isPayingDate
    ? convertUTCToLocal(profile.isPayingDate)
    : "";

  return (
    <div className="w-full">
      <div className="bg-compBg shadow-menu mb-4 rounded-lg pl-3 pr-3 pt-3">
        <Cover
          user={{ id: userId, profile: { id: profileId } }}
          avatarImage={ProfilePic}
          bannerImage={Banner}
          name={userName}
          updateImages={UpdateImages}
          uploadImage={UploadImages}
        />
        <div className="ml-2 mr-2 mt-4 pb-3">
          <hr className="bg-compBg" />
        </div>
      </div>
      <div className="my-4 flex gap-x-4">
        <Link scroll={false} href="/invoice">
          <Button className="bg-primary text-black">Generate Invoice</Button>
        </Link>
        <Button
          onClick={() => setIsOpen(!open)}
          className="bg-secondary text-black"
        >{`${
          profile?.cancelDate ? " Uncancel" : " Cancel"
        } Subscription`}</Button>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`ARE YOU SURE YOU WISH TO
              ${profile?.cancelDate ? " UNCANCEL" : " CANCEL"} YOUR SUBSCRIPTION?`}
        message={
          <>
            <div className="flex items-center justify-center">
              <img src="/user/CancelSub.png" alt="" />
            </div>
            <div className="text-textColor mb-4 mt-2 text-center text-xl">
              Your account will be
              {profile?.cancelDate
                ? ` uncanceled and your next payment will be on ${isPayingDate}.`
                : ` canceled and you will no longer have access to premium content after ${isPayingDate}`}
            </div>
            <div className="flex justify-center gap-3">
              <div className="">
                <Button
                  onClick={profile?.cancelDate ? unCancelSub : cancelSub}
                  className={profile?.cancelDate ? "bg-primary" : "bg-red-500"}
                >
                  Yes
                </Button>
              </div>
              <div className="">
                <Button
                  onClick={() => setOpen(!open)}
                  className={
                    profile?.cancelDate ? "bg-secondary" : "bg-primary"
                  }
                >
                  No
                </Button>
              </div>
            </div>
          </>
        }
      />
      <div className="space-y-5">
        <div className="bg-compBg shadow-menu rounded-lg p-4">
          <div className="flex flex-row">
            <div className="text-textColor my-3 ml-4 text-lg font-bold">
              Personal Information
            </div>
          </div>
          <div className="pt-3">
            <div className="">
              <InputField
                type="text"
                placeholder="Your First name"
                label="First name"
                value={firstName}
                onChange={(value) => setFirstName(value.toString())}
              />
              <InputField
                type="text"
                placeholder="Your Last name"
                label="Surname"
                value={lastName}
                onChange={(value) => setLastName(value.toString())}
              />
            </div>
            <div className="">
              <InputField
                type="text"
                placeholder="Your email address"
                label="Email"
                value={email}
                onChange={(value) => setEmail(value.toString())}
              />
            </div>
            <div className="">
              <InputField
                type="text"
                placeholder="Your cell number"
                label="CellNr"
                value={cellNr}
                onChange={(value) => setCellNr(value.toString())}
              />
            </div>
            <div className="">
              <InputField
                type="text"
                placeholder="Address"
                label="Address line 1"
                value={addressLine1}
                onChange={(value) => setAddressLine1(value.toString())}
              />
            </div>
            <div className="">
              <InputField
                type="text"
                placeholder="Postal Code"
                label="Postal code"
                value={postalCode}
                onChange={(value) => setPostalCode(value.toString())}
              />
            </div>
          </div>
        </div>
        <div className="bg-compBg shadow-menu rounded-lg p-4">
          <div className="flex flex-row">
            <div className="text-textColor my-3 ml-4 text-lg font-bold">
              Invoice Information
            </div>
          </div>
          <div className="pt-3">
            <div className="">
              <InputField
                type="text"
                label="Company"
                placeholder="Company"
                value={company}
                onChange={(value) => setCompany(value.toString())}
              />
            </div>
            <div className="">
              <InputField
                type="text"
                label="VAT Nr"
                placeholder="VAT number"
                value={vatNr}
                onChange={(value) => setVatNr(value.toString())}
              />
            </div>
            <div className="">
              <InputField
                type="text"
                label="Address line 1"
                placeholder="Billing address"
                value={addressLine1}
                onChange={(value) => setAddressLine1(value.toString())}
              />
            </div>
            <div className="">
              <InputField
                type="text"
                label="Additional Information"
                placeholder="Additional Information"
                value={additionalInformation}
                onChange={(value) => setAdditionalInformation(value.toString())}
              />
            </div>
          </div>
          <div className="flex w-full flex-row justify-start pt-4">
            <PopupAlert
              message={error ? error : success}
              variant={error ? "destructive" : "success"}
              visible={!!(error || success)}
            />
            <Button className="w-36 bg-primary px-3 py-2" onClick={save}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
