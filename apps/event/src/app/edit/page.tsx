import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { profileId } from "@acme/snippets/context/constants";
import { FetchEvent } from "@acme/snippets/functions/event/event";
import Modal from "@acme/ui/Modal";

interface Event {
  id: string;
  title?: string;
  start?: string;
  end?: string;
  image?: { url: string };
  description?: string;
  lesson?: { id: string };
  url?: string;
  location?: string;
  author?: {
    id: string;
  };
}

const EditEvent: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const [eventList, setEventList] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const { event } = await FetchEvent(id);
      if (event?.author?.id !== profileId) {
        // Redirect if the current user is not the event's author
        router.push("/events");
      } else {
        setEventList(event);
      }
    };

    fetchEvent();
  }, [id, router]);

  if (!eventList) {
    return null;
  }

  return (
    <Modal
      title={`Edit Event: ${eventList.title || "Untitled"}`}
      message={
        <>
          <p>{eventList.description || "No description provided."}</p>
          {eventList.start && (
            <p>
              <strong>Start:</strong>{" "}
              {new Date(eventList.start).toLocaleString()}
            </p>
          )}
          {eventList.end && (
            <p>
              <strong>End:</strong> {new Date(eventList.end).toLocaleString()}
            </p>
          )}
        </>
      }
      timestamp={eventList.start}
      isOpen={true}
      onClose={() => router.back()}
    />
  );
};

export default EditEvent;
