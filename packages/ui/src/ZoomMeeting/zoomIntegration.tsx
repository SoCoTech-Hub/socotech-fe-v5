"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { callApi } from "@acme/snippets/functions/zoom/api";

import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card";
import { Input } from "../input";
import { Label } from "../label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

export default function ZoomIntegration() {
  const [meetingId, setMeetingId] = useState("");
  const [meetingPassword, setMeetingPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const scheduleMeeting = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const result = await callApi("schedule", {
        topic: (event.target as any).topic.value,
        date: (event.target as any).date.value,
        time: (event.target as any).time.value,
        duration: (event.target as any).duration.value,
      });
      if (result.success) {
        alert(`Meeting scheduled with ID: ${result.meetingId}`);
      } else {
        setError("Failed to schedule meeting");
      }
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      setError("An error occurred while scheduling the meeting");
    } finally {
      setIsLoading(false);
    }
  };

  const joinMeeting = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const result = await callApi("join", {
        meetingId,
        password: meetingPassword,
      });
      if (result.success) {
        router.push(`/meeting/${meetingId}`);
      } else {
        setError("Failed to join meeting");
      }
    } catch (error) {
      console.error("Error joining meeting:", error);
      setError("An error occurred while joining the meeting");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="schedule" className="mx-auto w-full max-w-3xl">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="schedule">Schedule Meeting</TabsTrigger>
        <TabsTrigger value="join">Join Meeting</TabsTrigger>
      </TabsList>
      <TabsContent value="schedule">
        <Card>
          <CardHeader>
            <CardTitle>Schedule a Zoom Meeting</CardTitle>
            <CardDescription>
              Create a new Zoom meeting or webinar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={scheduleMeeting}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="topic">Meeting Topic</Label>
                  <Input id="topic" placeholder="Enter meeting topic" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="duration">Duration</Label>
                  <Select name="duration">
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <CardFooter className="mt-4 flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    "Schedule Meeting"
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
          {error && (
            <CardFooter>
              <p className="text-red-500">{error}</p>
            </CardFooter>
          )}
        </Card>
      </TabsContent>
      <TabsContent value="join">
        <Card>
          <CardHeader>
            <CardTitle>Join a Zoom Meeting</CardTitle>
            <CardDescription>
              Enter the meeting ID and password to join.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={joinMeeting}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="meetingId">Meeting ID</Label>
                  <Input
                    id="meetingId"
                    placeholder="Enter meeting ID"
                    value={meetingId}
                    onChange={(e) => setMeetingId(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter meeting password"
                    value={meetingPassword}
                    onChange={(e) => setMeetingPassword(e.target.value)}
                  />
                </div>
              </div>
              <CardFooter className="mt-4 flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    "Join Meeting"
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
          {error && (
            <CardFooter>
              <p className="text-red-500">{error}</p>
            </CardFooter>
          )}
        </Card>
      </TabsContent>
    </Tabs>
  );
}
