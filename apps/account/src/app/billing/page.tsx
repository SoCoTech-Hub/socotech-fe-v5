import React, { useEffect, useState } from "react";
import Link from "next/link";

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
  updateImages,
  uploadImages,
} from "@acme/snippets/functions/account/profile";
import {
  createOrUpdateTransaction,
  FetchTransactionByPaymentId,
} from "@acme/snippets/functions/account/transaction";
import { convertUTCToLocal } from "@acme/snippets/functions/convertUtcToLocal";
import { Button } from "@acme/ui/button";
import { InputField } from "@acme/ui/InputField/index";
import Modal from "@acme/ui/modal";
import { PopupAlert } from "@acme/ui/PopupAlert/index";
import Cover from "@acme/ui/profile/cover";
import { PopupAlert } from "@acme/ui/PopupAlert/index"

import api from "./api/api"; //TODO:payfast api
import { pauseSubscription, unpauseSubscription } from "./api/payfastApi"; //TODO:payfast api

import api from "./api/api"; //TODO:payfast api
import { pauseSubscription, unpauseSubscription } from "./api/payfastApi"; //TODO:payfast api

interface Transaction {
  id: string;
  company: string;
  vatNr: string;
  firstName: string;
  lastName: string;
  email: string;
  addressLine1: string;
  postalCode: string;
  cellnr: string;
  additionalInformation: string;
  signature: string | null;
}

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
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
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
        if (trans) {
          setTransactions(trans);
          setCompany(trans[0].company);
          setVatNr(trans[0].vatNr);
          setFirstName(trans[0].firstName);
          setLastName(trans[0].lastName);
          setEmail(trans[0].email);
          setAddressLine1(trans[0].addressLine1);
          setPostalCode(trans[0].postalCode);
          setAdditionalInformation(trans[0].additionalInformation);
          setCellNr(trans[0].cellnr);
        }

        const prof = await FetchProfile(profileId);
        if (prof) {
          setProfile(prof);
        }

        const merch = await FetchOrganizationMerchantId;
        setOrg(merch);
      }
    };

    fetchData();
  }, [uniqueId]);

  const cancelSub = async () => {
    const date = new Date();
    if (transactions[0].signature) {
      await pauseSubscription(transactions[0].signature, org);
    }
    await api.put(`/profiles/${profileId}`, {
      cancelDate: date.toISOString().split("T")[0],
    });
    setIsOpen(false);
    setProfile({ ...profile, cancelDate: date.toISOString().split("T")[0] });
  };

  const unCancelSub = async () => {
    if (transactions[0].signature) {
      await unpauseSubscription(transactions[0].signature, org);
    }
    await api.put(`/profiles/${profileId}`, {
      cancelDate: null,
    });
    setIsOpen(false);
    setProfile({ ...profile, cancelDate: "" });
  };

  const save = async () => {
    setSuccess("");
    setError("");
    const res = await createOrUpdateTransaction(
      transactions?.[0]?.id,
      { company: company,
      vatNr: vatNr,
      firstName: firstName,
      lastName: lastName,
      email: email,
      addressLine1: addressLine1,
      postalCode: postalCode,
      cellNr: cellNr,
      additionalInformation: additionalInformation},
    );
    // const res = await api.put(`transactions/${transactions[0].id}`, {
      // company: company,
      // vatNr: vatNr,
      // firstName: firstName,
      // lastName: lastName,
      // email: email,
      // addressLine1: addressLine1,
      // postalCode: postalCode,
      // cellNr: cellNr,
      // additionalInformation: additionalInformation,
    // });
    if (!res.ok) {
      setError("Something went wrong");
    }

    setSuccess("Billing Information Updated");
    return;
  };

  const isPayingDate = convertUTCToLocal(profile?.isPayingDate || "");

  return (
    <div className="w-full">
      <div className="bg-compBg shadow-menu mb-4 rounded-lg pl-3 pr-3 pt-3">
        <Cover
          user={{ id: userId, profile: { id: profileId } }}
          avatarImage={ProfilePic}
          bannerImage={Banner}
          name={userName}
          updateImages={updateImages}
          uploadImage={uploadImages}
        />
        <div className="ml-2 mr-2 mt-4 pb-3">
          <hr className="bg-compBg" />
        </div>
      </div>
      <div className="my-4 flex gap-x-4">
        <Link href={"/invoice"}>
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
