"use client";

import { useState } from "react";

import { Card, CardContent } from "../card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import AboutSection from "./about";
import InfoSection from "./info";
import ReportSection from "./report";

export default function Section() {
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
            <AboutSection
              firstName="John"
              surname="Doe"
              email="john.doe@example.com"
              bio="I am a software developer with a passion for creating user-friendly applications."
              location="San Francisco, CA"
            />
          </TabsContent>
          <TabsContent value="info">
            <InfoSection />
          </TabsContent>
          <TabsContent value="report">
            <ReportSection />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
