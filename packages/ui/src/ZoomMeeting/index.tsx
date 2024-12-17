import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Button } from "../button";

const ZoomMeeting: React.FC = () => {
  const router = useRouter();
  const { meetingLink, lessonId } = router.query;

  const [meetingNumber, setMeetingNumber] = useState<string | null>(null);
  const [meetingPassword, setMeetingPassword] = useState<string | null>(null);

  useEffect(() => {
    if (typeof meetingLink === "string") {
      try {
        const url = new URL(meetingLink);
        setMeetingNumber(url.pathname.replace(/[^0-9.]+/, ""));
        setMeetingPassword(url.searchParams.get("pwd"));
      } catch (error) {
        console.error("Invalid meeting link:", error);
      }
    }
  }, [meetingLink]);

  if (!meetingLink || typeof meetingLink !== "string") {
    return <p align="center">Please, provide a valid meeting link!</p>;
  }

  return (
    <div>
      {lessonId ? (
        <Button
          label="Join Webinar"
          link={`/webinar/${lessonId}/${meetingNumber}/${meetingPassword}`}
          onClickFunction={() => {}}
          color="bg-themeColorMain"
        />
      ) : (
        <Button
          label="Join Meeting"
          link={`/meeting/${meetingNumber}/${meetingPassword}`}
          onClickFunction={() => {}}
          color="bg-themeColorMain"
        />
      )}
    </div>
  );
};

export default ZoomMeeting;
