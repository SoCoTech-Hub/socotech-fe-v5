"use client";

import React from "react";

import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Toast } from "./toast";

export default function ComingSoonCard({
  title = "Coming Soon",
  description = "We're working on something exciting. Stay tuned!",
  ctaText = "Notify Me",
}: {
  title?: string;
  description?: string;
  ctaText?: string;
}) {
  const handleNotify = () => {
    // Here you would typically handle the notification logic
    // For example, open a modal, redirect to a signup page, etc.
    Toast({
      title: "Notification Set!",
      children: "You'll be notified when we launch.",
    });
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          {title}
        </CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex h-40 items-center justify-center rounded-md bg-gradient-to-r from-blue-400 to-purple-500">
          <span className="text-4xl font-bold text-white">Coming Soon</span>
        </div>
        <Button onClick={handleNotify} className="w-full">
          {ctaText}
        </Button>
      </CardContent>
      <CardFooter className="text-center text-sm text-gray-500">
        Be the first to know when we launch!
      </CardFooter>
    </Card>
  );
}
