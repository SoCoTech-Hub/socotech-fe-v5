"use client";

import { useState } from "react";

import type { Material } from "./materials";
import type { Rating } from "./ratings";
import { Progress } from "../progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";
import LessonContent from "./content";
import HelpfulMaterials from "./materials";
import LessonOverview from "./overview";
import RatingComponent from "./ratings";
import RatingSubmission from "./submit";
import RatingSummary from "./summary";
import HeaderSection from "./viewHeader";
import HeaderImage from "./viewHeaderImage";

export interface Comment {
  id: string;
  user: string;
  content: string;
  date: string;
  rating: number;
  likes: number;
}

export interface ViewProps {
  id: string;
  subject: string;
  title: string;
  overview: string;
  duration: string;
  presenter: string;
  videoUrl: string;
  hasQuiz: boolean;
  progress?: number;
  headerImageUrl: string;
  headerImageAlt: string;
  materials: Material[];
  ratings: Rating[];
  onSubmit: (rating: { rating: number; comment: string }) => void;
}

export default function ViewPage({
  subject,
  title,
  overview,
  duration,
  presenter,
  hasQuiz,
  progress = 0,
  headerImageUrl,
  headerImageAlt,
  materials,
  ratings,
  onSubmit,
}: ViewProps) {
  const [activeTab, setActiveTab] = useState("lesson");

  return (
    <div className="min-h-screen">
      {/* Header Image */}
      <HeaderImage
        headerImageAlt={headerImageAlt}
        headerImageUrl={headerImageUrl}
      />

      <div className="p-4 md:p-8">
        {/* Header */}
        <HeaderSection subject={subject} title={title} />

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="w-full" />
          <p className="mt-2 text-sm">{progress}% COMPLETED</p>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="lesson">Lesson</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
          </TabsList>

          <TabsContent value="lesson" className="space-y-8">
            {/* Lesson Overview */}
            <LessonOverview
              duration={duration}
              overview={overview}
              presenter={presenter}
            />

            {/* Lesson Content */}
            <LessonContent hasQuiz={hasQuiz} subject={subject} title={title} />
          </TabsContent>

          {/* Materials */}
          <HelpfulMaterials materials={materials} />
        </Tabs>

        {/* Comments Section */}
        <RatingSummary ratings={ratings} />

        <RatingSubmission onSubmit={onSubmit} />

        <RatingComponent {...ratings} />
      </div>
    </div>
  );
}
