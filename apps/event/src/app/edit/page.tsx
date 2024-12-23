import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {FetchEvent} from "@acme/snippets/functions/event/event";

import Modal from "@acme/ui/Modal";

interface Event {
      id: string;
      title?: string;
      start?: string;
      end?: string;
      image?: { url: string };
      desciption?: string;
      lesson?: { id: string };
      url?: string;
      location?: string;
      author?: {
        id: string;
      };
    }

const EditEvent = () => {
  const router = useRouter();
  const { event } = await FetchEvent(id);//TODO: fetch id for edit page
  const [eventList,setEventList] = useState<Event|null>(null);

  useEffect(() => {
    if (event.author.id !== profileId) {//TODO: fetch profileId
      router.push("/events");
    } else {
      setEventList(event);
    }
  },[event])

  return eventList?.id ? <Modal //TODO: @Garreth return a form to edit the event instead of a modal
      eventList={eventList}
      setEventList={setEventList}
      isEdit={true}
      isOpen={true}
      setIsOpen={() => router.back()}
      eventData={event}
    />:<></>
  
};


export default EditEvent;
