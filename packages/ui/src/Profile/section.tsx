"use client";

import { useState } from "react";

import { Card, CardContent } from "../card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import { AboutSection, UserProfile } from "./about";
import { Dropdowns, InfoSection, UserInfo } from "./info";
import { ReportSection, ReportSectionProps } from "./report";

// Props for the Section Component
export interface SectionProps {
  aboutInfo: UserProfile;
  dropdowns: Dropdowns;
  initialUserInfo: UserInfo;
  ReportSectionProps: ReportSectionProps;
}

export function Section({
  aboutInfo,
  dropdowns,
  initialUserInfo,
  ReportSectionProps,
}: SectionProps) {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-3">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="report">Report</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <AboutSection {...aboutInfo} />
          </TabsContent>
          <TabsContent value="info">
            <InfoSection
              dropdowns={dropdowns}
              initialUserInfo={initialUserInfo}
              onSave={(updatedSection) =>
                console.log("Saved section:", updatedSection)
              }
            />
          </TabsContent>
          <TabsContent value="report">
            <ReportSection {...ReportSectionProps} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
