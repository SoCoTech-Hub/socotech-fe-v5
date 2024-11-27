"use client";

import React, { useEffect, useState } from "react";
import { Save } from "lucide-react";

import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { DropdownSelect } from "../dropdownSelect";
import { Input } from "../input";
import { Label } from "../label";
import { Skeleton } from "../skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

interface UserInfo {
  personalInfo: {
    idNumber: string;
    dateOfBirth: string;
    gender: string;
    province: string;
    school: string;
    district: string;
  };
  deviceInfo: {
    serialNumber: string;
    imei: string;
  };
  parentInfo: {
    name: string;
    surname: string;
    mobileNumber: string;
    workNumber: string;
    idNumber: string;
    title: string;
    relation: string;
  };
  contactInfo: {
    addressLine1: string;
    addressLine2: string;
    town: string;
    mobileNumber: string;
  };
}

interface InfoSectionProps {
  dropdowns: { section: { id: string; name: string }[] }[];
  initialUserInfo: UserInfo;
  onSave: (user: UserInfo[keyof UserInfo]) => void;
}

export default function InfoSection({
  dropdowns,
  initialUserInfo,
  onSave,
}: InfoSectionProps) {
  const [activeTab, setActiveTab] = useState("personal");
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [loading, setLoading] = useState<Record<string, boolean>>({
    personal: true,
    device: true,
    parent: true,
    contact: true,
  });

  useEffect(() => {
    setLoading((prev) => ({ ...prev, [activeTab]: false }));
  }, [activeTab]);

  const handleInputChange = (
    section: keyof UserInfo,
    field: string,
    value: string,
  ) => {
    setUserInfo((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = (section: keyof UserInfo) => {
    onSave(userInfo[section]);
  };

  const renderInputField = (
    section: keyof UserInfo,
    field: string,
    label: string,
    type = "text",
  ) => (
    <div className="mb-4">
      <Label htmlFor={`${section}-${field}`}>{label}</Label>
      <Input
        type={type}
        id={`${section}-${field}`}
        value={
          userInfo[section][field as keyof (typeof userInfo)[typeof section]]
        }
        onChange={(e: { target: { value: string } }) =>
          handleInputChange(section, field, e.target.value)
        }
      />
    </div>
  );

  const renderSelect = (
    section: keyof UserInfo,
    field: string,
    label: string,
    options: { id: string; value: string }[],
  ) => (
    <div className="mb-4">
      <DropdownSelect
        label={label}
        placeholder={`Select ${label}`}
        options={options.map(({ id, value }) => ({
          value: id,
          label: value,
        }))}
        onChange={(value: string) => handleInputChange(section, field, value)}
      />
    </div>
  );

  const renderSkeleton = () => (
    <>
      <Skeleton className="mb-4 h-10 w-full" />
      <Skeleton className="mb-4 h-10 w-full" />
      <Skeleton className="mb-4 h-10 w-full" />
      <Skeleton className="mb-4 h-10 w-full" />
    </>
  );

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="device">Device</TabsTrigger>
            <TabsTrigger value="parent">Parent</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            {loading.personal ? (
              renderSkeleton()
            ) : (
              <>
                {renderInputField("personalInfo", "idNumber", "ID Number")}
                {renderInputField(
                  "personalInfo",
                  "dateOfBirth",
                  "Date of Birth",
                  "date",
                )}
                {renderSelect(
                  "personalInfo",
                  "gender",
                  "Gender",
                  dropdowns.genders,
                )}
                {renderSelect(
                  "personalInfo",
                  "province",
                  "Province",
                  dropdowns.provinces,
                )}
                {renderSelect(
                  "personalInfo",
                  "school",
                  "School",
                  dropdowns.schools,
                )}
                {renderSelect(
                  "personalInfo",
                  "district",
                  "District",
                  dropdowns.districts,
                )}
                <Button
                  onClick={() => handleSave("personalInfo")}
                  className="w-full"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Personal Info
                </Button>
              </>
            )}
          </TabsContent>
          <TabsContent value="device">
            {loading.device ? (
              renderSkeleton()
            ) : (
              <>
                {renderInputField(
                  "deviceInfo",
                  "serialNumber",
                  "Device Serial Number",
                )}
                {renderInputField("deviceInfo", "imei", "Device IMEI")}
                <Button
                  onClick={() => handleSave("deviceInfo")}
                  className="w-full"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Device Info
                </Button>
              </>
            )}
          </TabsContent>
          <TabsContent value="parent">
            {loading.parent ? (
              renderSkeleton()
            ) : (
              <>
                {renderInputField("parentInfo", "name", "Parent Name")}
                {renderInputField("parentInfo", "surname", "Parent Surname")}
                {renderInputField(
                  "parentInfo",
                  "mobileNumber",
                  "Parent Mobile Number",
                )}
                {renderInputField(
                  "parentInfo",
                  "workNumber",
                  "Parent Work Number",
                )}
                {renderInputField("parentInfo", "idNumber", "Parent ID")}
                {renderSelect(
                  "parentInfo",
                  "title",
                  "Parent Title",
                  dropdowns.titles,
                )}
                {renderSelect(
                  "parentInfo",
                  "relation",
                  "Parent Relation",
                  dropdowns.relationships,
                )}
                <Button
                  onClick={() => handleSave("parentInfo")}
                  className="w-full"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Parent Info
                </Button>
              </>
            )}
          </TabsContent>
          <TabsContent value="contact">
            {loading.contact ? (
              renderSkeleton()
            ) : (
              <>
                {renderInputField(
                  "contactInfo",
                  "addressLine1",
                  "Address Line 1",
                )}
                {renderInputField(
                  "contactInfo",
                  "addressLine2",
                  "Address Line 2",
                )}
                {renderInputField("contactInfo", "town", "Town")}
                {renderInputField(
                  "contactInfo",
                  "mobileNumber",
                  "Mobile Number",
                )}
                <Button
                  onClick={() => handleSave("contactInfo")}
                  className="w-full"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Contact Info
                </Button>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
