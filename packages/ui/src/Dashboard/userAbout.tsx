"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  GraduationCap,
  MapPin,
  School,
} from "lucide-react";

import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";

export interface UserAboutProps {
  school?: string;
  province?: string;
  grade?: string;
  bio?: string;
}

export default function UserAbout({
  school = "University of Example",
  province = "Example Province",
  grade = "Senior",
  bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
}: UserAboutProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="mx-auto w-full max-w-2xl dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl font-bold dark:text-white">
          About Me
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center space-x-2">
            <School className="h-5 w-5 text-primary dark:text-primary-foreground" />
            <span className="dark:text-gray-300">{school}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary dark:text-primary-foreground" />
            <span className="dark:text-gray-300">{province}</span>
          </div>
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-primary dark:text-primary-foreground" />
            <span className="dark:text-gray-300">{grade}</span>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold dark:text-white">Bio</h3>
          <p className={`dark:text-gray-300 ${expanded ? "" : "line-clamp-3"}`}>
            {bio}
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center dark:text-gray-300 dark:hover:text-white"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                Show Less <ChevronUp className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Show More <ChevronDown className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
