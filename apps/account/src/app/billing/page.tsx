import React, { useEffect, useState } from "react";
import Alert from "@/components/Alert";
import Btn from "@/components/Btn";
import BtnBig from "@/components/BtnBig";
import InputField from "@/components/InputField";
import Overlay from "@/components/Overlay";
import ProfileUserCover from "@/components/ProfileUserCover";
// import { organizationId, profileId, uniqueId } from "@/context/constants";
// import getGQLRequest from "@/snippets/getGQLRequest";
// import getReadableDate from "@/snippets/user/getReadableDate";

import { createOrUpdateTransaction, FetchTransactions } from "@acme/snippets/functions/account/transaction";
import {FetchProfile } from "@acme/snippets/functions/account/profile";
import { FetchOrganizationMerchantId } from "@acme/snippets/functions/account/organization";

import api from "./api/api";
import { pauseSubscription, unpauseSubscription } from "./api/payfastApi";
import { organizationId, profileId, uniqueId } from "@/context/constants";
import getReadableDate from "@/snippets/user/getReadableDate";
import Alert from "@acme/ui/alert";
import Button from "@acme/ui/button";
import InputField from "@acme/ui/InputField/index";
import Modal from "@acme/ui/modal";
import Cover from "@acme/ui/profile/cover";

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
        const trans = await FetchTransactions(uniqueId);
      if (trans.length) {
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
        if(prof){
        setProfile(prof)}
        
        const merch = await FetchOrganizationMerchantId
        setOrg(merch)
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
    const result = await createOrUpdateTransaction(
      transactions?.[0]?.id,
      transactionData,
    );
    const res = await api.put(`transactions/${transactions[0].id}`, {
      company: company,
      vatNr: vatNr,
      firstName: firstName,
      lastName: lastName,
      email: email,
      addressLine1: addressLine1,
      postalCode: postalCode,
      cellNr: cellNr,
      additionalInformation: additionalInformation,
    });
    if (!res.ok) {
      setError("Something went wrong");
    }

    setSuccess("Billing Information Updated");
    return;
  };

  const isPayingDate = getReadableDate(profile?.isPayingDate);

  return (
    <div className="w-full">
      <div className="pt-3 pl-3 pr-3 mb-4 rounded-lg bg-compBg shadow-menu">
        <ProfileUserCover edit="true" />
        <div className="pb-3 mt-4 ml-2 mr-2">
          <hr className="bg-compBg" />
        </div>
      </div>
      <div className="flex my-4 gap-x-4">
        <BtnBig
          link="invoice"
          label="Generate Invoice"
          color="bg-themeColorMain"
          textColor="black"
        />
        <BtnBig
          onClickFunction={() => setIsOpen(!open)}
          label={`${
            profile?.cancelDate ? " Uncancel" : " Cancel"
          } Subscription`}
          color="bg-themeColorSecondary"
          textColor="black"
        />
      </div>
      <Overlay
        bgColor="compBg"
        open={open}
        isOpen={isOpen}
        setOpen={setIsOpen}
        width={"3/4"}
        height={58}
        onClose={() => setIsOpen(false)}
        content={
          <>
            <div className="p-4 mb-4 leading-tight text-center rounded-lg text-textColor heading bg-themeColorMain">
              ARE YOU SURE YOU WISH TO
              {profile?.cancelDate ? " UNCANCEL" : " CANCEL"} YOUR SUBSCRIPTION?
            </div>
            <div className="flex items-center justify-center">
              <img src="/user/CancelSub.png" alt="" />
            </div>
            <div className="mt-2 mb-4 text-xl text-center text-textColor">
              Your account will be
              {profile?.cancelDate
                ? ` uncanceled and your next payment will be on ${isPayingDate}.`
                : ` canceled and you will no longer have access to premium content after ${isPayingDate}`}
            </div>
            <div className="flex justify-center gap-3">
              <div className="">
                <Btn
                  onClickFunction={
                    profile?.cancelDate ? unCancelSub : cancelSub
                  }
                  label="Yes"
                  color={
                    profile?.cancelDate ? "bg-themeColorMain" : "bg-red-500"
                  }
                />
              </div>
              <div className="">
                <Btn
                  onClickFunction={() => setOpen(!open)}
                  label="No"
                  color={
                    profile?.cancelDate
                      ? "bg-themeColorSecondary"
                      : "bg-themeColorMain"
                  }
                />
              </div>
            </div>
          </>
        }
      />
      <div className="space-y-5">
        <div className="p-4 rounded-lg bg-compBg shadow-menu">
          <div className="flex flex-row">
            <div className="my-3 ml-4 text-lg font-bold text-textColor">
              Personal Information
            </div>
          </div>
          <div className="pt-3">
            <div className="">
              <InputField
                placeholder="Your First name"
                id="firstName"
                value={firstName}
                onChange={() => setFirstName()}
              />
              <InputField
                placeholder="Your Last name"
                id="lastName"
                value={lastName}
                onChange={() => setLastName()}
              />
            </div>
            <div className="">
              <InputField
                placeholder="Your email address"
                id="email"
                value={email}
                onChange={() => setEmail()}
              />
            </div>
            <div className="">
              <InputField
                placeholder="Your cell number"
                id="cellNr"
                value={cellNr}
                onChange={() => setCellNr()}
              />
            </div>
            <div className="">
              <InputField
                placeholder="Address"
                id="addressLine1"
                value={addressLine1}
                onChange={() => setAddressLine1()}
              />
            </div>
            <div className="">
              <InputField
                placeholder="Postal Code"
                id="postalCode"
                value={postalCode}
                onChange={() => setPostalCode()}
              />
            </div>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-compBg shadow-menu">
          <div className="flex flex-row">
            <div className="my-3 ml-4 text-lg font-bold text-textColor">
              Invoice Information
            </div>
          </div>
          <div className="pt-3">
            <div className="">
              <InputField
                id="company"
                placeholder="Company"
                value={company}
                onChange={() => setCompany()}
              />
            </div>
            <div className="">
              <InputField
                id="vatNr"
                placeholder="VAT number"
                value={vatNr}
                onChange={() => setVatNr()}
              />
            </div>
            <div className="">
              <InputField
                id="addressLine1"
                placeholder="Billing address"
                value={addressLine1}
                onChange={() => setAddressLine1()}
              />
            </div>
            <div className="">
              <InputField
                id="additionalInformation"
                placeholder="Additional Information"
                value={additionalInformation}
                onChange={() => setAdditionalInformation()}
              />
            </div>
          </div>
          <div className="flex flex-row justify-start w-full pt-4">
            <Alert success={success} error={error} />
            <Btn
              label="Save"
              color="bg-themeColorMain"
              width="36"
              padding="px-3 py-2"
              onClickFunction={save}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default billing;
