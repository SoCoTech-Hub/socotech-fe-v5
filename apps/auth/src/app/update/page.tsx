import React, { FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import client from "@/api/apolloClient"; //TODO:Replace all apolloClient
import { gql } from "@apollo/client";

import { baseUrl } from "@acme/snippets/context/constants";
import { FetchDistrictsByProvince } from "@acme/snippets/functions/auth/district";
import { FetchSchoolsByDistrict } from "@acme/snippets/functions/auth/school";
import updateUserDetails from "@acme/snippets/functions/user/updateUserDetails";
import { Button } from "@acme/ui";
import { Checkbox } from "@acme/ui";
import { DatePicker } from "@acme/ui";
import DefaultSelectNew from "@acme/ui"; //TODO:Replace all DefaultSelectNew
import { InputField } from "@acme/ui";
import {InputMask} from "@acme/ui";
import {LogoOverlay} from "@acme/ui";
import Overlay from "@acme/ui"; //TODO:Replace overlay
import { PopupAlert } from "@acme/ui";
import { InfoIcon } from "@acme/ui";

type UpdateProps = {
  profile: any;
  grades: any[];
  locations: any[];
  genders: any[];
};

const Update: FC<UpdateProps> = ({ profile, grades, locations, genders }) => {
  const router = useRouter();
  const [success, setSuccess] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [check, setCheck] = useState<boolean>(false);
  const [userInput, setUserInput] = useState({
    dob: "",
    firstName: "",
    lastName: "",
    mobileNr: "",
  });
  const [grade, setGrade] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [regions, setRegions] = useState<any[]>([]);
  const [school, setSchool] = useState<string>("");
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!profile?.id) {
      router.push("/");
    }
  }, [profile, router]);

  useEffect(() => {
    if (profile) {
      setUserInput({
        dob: profile.dob,
        firstName: profile.firstName || "",
        lastName: profile.lastName,
        mobileNr: profile.mobileNr,
      });
      setGender(profile?.gender?.id);
      setGrade(profile?.grades.length > 0 ? profile.grades[0].id : "");
      setLocation(profile?.provinces.length > 0 ? profile.provinces[0].id : "");
      setSchool(profile?.schools.length > 0 ? profile.schools[0].id : "");
      setRegion(
        profile?.schools.length > 0 ? profile.schools[0].district?.id : "",
      );
    }
  }, [profile]);

  useEffect(() => {
    const fetchRegions = async () => {
      if (location) {
        const res = await FetchDistrictsByProvince(location);
        setRegions(res.districts);
      }
    };
    fetchRegions();
  }, [location]);

  useEffect(() => {
    const fetchSchools = async () => {
      if (region) {
        const res = await FetchSchoolsByDistrict(region);
        setSchools(res.schools);
      }
    };
    fetchSchools();
  }, [region]);

  const updateInput = (value: string, type: string) => {
    setUserInput({
      ...userInput,
      [type]: value,
    });
  };

  const updateUser = async () => {
    setError("");
    setLoading(true);

    if (
      !userInput.dob?.length ||
      !userInput.firstName?.length ||
      !userInput.lastName?.length ||
      !userInput.mobileNr?.length
    ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    const { error: errorMsg } = await updateUserDetails({
      profileID: profile.id,
      userInput: userInput,
      grade: grade,
      location: location,
      school: school,
      gender: gender,
    });

    if (errorMsg) {
      setError(errorMsg);
      setLoading(false);
      return;
    }
    setLoading(false);
    router.push("../user/userdashboard");
  };

  function isUnder18(dob: string): boolean {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age < 18;
  }
  function isUnderAge(dob: string): boolean {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age < 15;
  }

  return (
    <div className="g-0 flex min-h-svh justify-between overflow-x-hidden">
      {/* Left Section - Image */}
      <div className="desktop:w-1/2 laptop:w-1/2 flex">
        <div className="desktop:h-screen laptop:h-screen relative flex w-full items-center justify-center">
          <img
            src={`${baseUrl}/update-background.jpg`}
            alt="Background Login Image"
            className="absolute h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={`${baseUrl}/update-image.png`}
              alt="Update-Image"
              className="h-screen object-contain"
            />
          </div>
        </div>
      </div>
      {/* Right Section - Form */}
      <div className="mobile:mx-4 desktop:pt-16 mobile:w-full mx-10 w-1/2 pt-6">
        <LogoOverlay />
        <div className="desktop:pt-6 flex flex-row justify-between pt-4">
          <div className="mobile:text-xl text-textColor justify-start text-3xl">
            <div className="flex flex-row">
              <div>Account Details</div>
              <div>
                <InfoIcon
                  onClick={() => setIsOpen(!isOpen)}
                  className="mx-2 h-6 w-6 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="text-textColor flex flex-row justify-start">
            <Overlay
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              title="Account Details"
              content={
                <>
                  <p className="text-left text-lg text-black">
                    Account details are vital as they serve to identify,
                    authenticate, and secure user accounts. They enable accurate
                    tracking of transactions, facilitate communication, and
                    support personalized experiences.
                  </p>
                  <p className="mt-4 text-left text-lg text-black">
                    Compliance with legal regulations, recovery processes, and
                    preventing identity theft are additional reasons why
                    maintaining up-to-date and secure account details is crucial
                    for a safe and reliable online environment.
                  </p>
                </>
              }
            />
          </div>
        </div>
        {/* Form Fields */}
        <form
          autoComplete="on"
          className="mobile:flex-col desktop:flex-row laptop:flex-row flex"
        >
          {/* First Column */}
          <div className="desktop:flex laptop:flex desktop:flex-col laptop:flex-col mobile:w-full mr-3 w-1/2">
            <DatePicker
              id="dob"
              placeholder="Date of Birth"
              onChange={(e) => updateInput(e.target.value, "dob")}
              value={userInput.dob}
              required={true}
            />
            <InputField
              label="First Name"
              placeholder="First Name"
              type="text"
              value={userInput.firstName}
              onChange={(value) => updateInput(value as string, "firstName")}
            />

            <InputField
              label="Surname"
              placeholder="Your Surname"
              type="text"
              value={userInput.lastName}
              onChange={(value) => updateInput(value as string, "lastName")}
            />
            <InputMask
              label="Mobile Number"
              onChange={(e) => updateInput(e.target.value, "mobileNr")}
              value={userInput.mobileNr}
              type="mobile"
            />
            <DefaultSelectNew
              id="gender"
              name="Gender"
              options={genders}
              valueSetter={setGender}
              value={gender}
              placeholder="Gender"
            />
          </div>
          {/* Second Column */}
          <div className="desktop:flex laptop:flex desktop:flex-col laptop:flex-col desktop:mt-1 laptop:mt-1 mobile:-mt-1.5 mobile:w-full w-1/2">
            <DefaultSelectNew
              id="grade"
              name="Grade"
              options={grades}
              valueSetter={setGrade}
              value={grade}
              placeholder="Grade"
            />
            <DefaultSelectNew
              id="location"
              name="Location"
              options={locations}
              valueSetter={setLocation}
              value={location}
              placeholder="Location"
            />
            <DefaultSelectNew
              id="schoolRegion"
              name="School Region"
              options={regions}
              valueSetter={setRegion}
              value={region}
              placeholder="School Region"
            />
            <DefaultSelectNew
              id="school"
              name="School"
              options={schools}
              valueSetter={setSchool}
              value={school}
              placeholder="School"
            />{" "}
          </div>
        </form>

        {isUnder18(userInput.dob) && (
          <div className="mobile:mb-4 mb-4 mt-3 flex items-center">
            <Checkbox
              checked={check}
              onCheckedChange={(value) => setCheck(value as boolean)}
            />
            <div className="text-textColor ml-2 text-sm">
              <span>I have permission from my</span>
              <Link href="/">
                <a className="text-textHeading ml-1 font-bold underline">
                  Parents/ Guardian
                </a>
              </Link>
            </div>
          </div>
        )}
        {/* Submit Button and Alerts */}
        <div className="">
          <PopupAlert
            message={error ? error : success}
            variant={error ? "destructive" : "success"}
            visible={!!(error || success)}
          />
          <div
            className={`${
              isUnder18(userInput.dob) ? "" : "mobile:mt-4 mt-3"
            } mobile:justify-center mobile:flex mobile:mb-4`}
          >
            <Button
              onClick={updateUser}
              className="mobile:px-8 bg-themeColorMain"
              disabled={loading}
            >
              {loading ? "Loading..." : "Completed"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userid, profile: profileId } = context.req.cookies;

  if (profileId) {
    const { data } = await client.query({
      query: gql`query GetUpdateRequest {profile(id: ${profileId}) {id,dob,gender {id,name},mobileNr,firstName,lastName,grades {id,name},provinces {id,name},schools {id,name,district {id,name}}},genders{id,name},grades{id,name},provinces{id,name}}`,
      fetchPolicy: "network-only",
    });
    const { profile, genders, grades, provinces } = data;

    return {
      props: {
        userId: userid ? userid : null,
        profile: profile ? profile : null,
        genders: genders,
        grades: grades ? grades : null,
        locations: provinces ? provinces : null,
      },
    };
  } else {
    return {
      props: {
        profile: null,
        genders: [{ id: 0, name: "" }],
        grades: [{ id: 0, name: "" }],
        locations: [{ id: 0, name: "" }],
      },
    };
  }
};

export default Update;
