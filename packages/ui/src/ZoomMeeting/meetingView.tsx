"use client";

import { useEffect, useRef, useState } from "react";
import { ZoomMtg } from "@zoomus/websdk";

import { Button } from "../button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../card";
import { Input } from "../input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

export interface MeetingViewProps {
  meetingId: string;
}

export default function MeetingView({ meetingId }: MeetingViewProps) {
  const zoomMeetingRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  useEffect(() => {
    // Initialize Zoom Meeting SDK
    ZoomMtg.setZoomJSLib("https://source.zoom.us/2.9.5/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();

    // Set language
    ZoomMtg.i18n.load("en-US");
    ZoomMtg.i18n.reload("en-US");

    // Initialize meeting
    initializeMeeting();
  }, [meetingId]);

  const initializeMeeting = async () => {
    try {
      setIsLoading(true);
      const { signature, sdkKey, userName, userEmail } =
        await fetchMeetingConfig(meetingId);

      ZoomMtg.init({
        leaveUrl: "/meeting-ended",
        success: (success: any) => {
          console.log(success);
          ZoomMtg.join({
            signature: signature,
            meetingNumber: meetingId,
            userName: userName,
            sdkKey: sdkKey,
            userEmail: userEmail,
            passWord: "", // TODO: Handle password if required
            success: (success: any) => {
              console.log(success);
              setIsLoading(false);
              setupEventListeners();
            },
            error: (error: any) => {
              console.log(error);
              setError("Failed to join the meeting. Please try again.");
              setIsLoading(false);
            },
          });
        },
        error: (error: any) => {
          console.log(error);
          setError("Failed to initialize the meeting. Please try again.");
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error("Failed to initialize meeting:", error);
      setError("Failed to initialize the meeting. Please try again.");
      setIsLoading(false);
    }
  };

  const fetchMeetingConfig = async (meetingId: string) => {
    const response = await fetch(
      `/api/zoom/meeting-config?meetingId=${meetingId}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch meeting configuration");
    }
    return response.json();
  };

  const setupEventListeners = () => {
    ZoomMtg.inMeetingServiceListener("onUserJoin", (data: any) => {
      setParticipants((prev) => [...prev, data.userName]);
    });

    ZoomMtg.inMeetingServiceListener("onUserLeave", (data: any) => {
      setParticipants((prev) => prev.filter((name) => name !== data.userName));
    });
    // TODO: Fix this section, Zoom no longer has the onChatReceived functions
    // ZoomMtg.inMeetingServiceListener("onChatReceived", (data: any) => {
    //   setChatMessages((prev) => [
    //     ...prev,
    //     `${data.sender.name}: ${data.message}`,
    //   ]);
    // });
    setChatMessages([]);
  };

  const sendChatMessage = () => {
    if (newMessage.trim()) {
      //TODO: Fix this section, Zoom no longer has onChatReceived and sendMessage functions
      // ZoomMtg.inMeetingServiceListener("onChatReceived", (data: any) => {
      //   setChatMessages((prev) => [
      //     ...prev,
      //     `${data.sender.name}: ${data.message}`,
      //   ]);
      // });
      // ZoomMtg.sendMessage(newMessage);
      setNewMessage("");
    }
  };

  const toggleScreenShare = () => {
    //TODO: Fix this section, Zoom nolonger has stopShareScreen and shareScreen functions
    // if (isScreenSharing) {
    //   ZoomMtg.stopShareScreen();
    // } else {
    //   ZoomMtg.shareScreen();
    // }
    setIsScreenSharing(!isScreenSharing);
  };

  if (isLoading) {
    return <div>Loading meeting...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Meeting: {meetingId}</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={zoomMeetingRef} id="zmmtg-root"></div>
        <Tabs defaultValue="chat" className="mt-4">
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
          </TabsList>
          <TabsContent value="chat">
            <div className="mb-2 h-40 overflow-y-auto">
              {chatMessages.map((message, index) => (
                <div key={index}>{message}</div>
              ))}
            </div>
            <div className="flex">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <Button onClick={sendChatMessage}>Send</Button>
            </div>
          </TabsContent>
          <TabsContent value="participants">
            <div className="h-40 overflow-y-auto">
              {participants.map((participant, index) => (
                <div key={index}>{participant}</div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={() => ZoomMtg.leaveMeeting({})}>Leave Meeting</Button>
        <Button onClick={toggleScreenShare}>
          {isScreenSharing ? "Stop Sharing" : "Share Screen"}
        </Button>
      </CardFooter>
    </Card>
  );
}
