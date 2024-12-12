import React, { useState } from "react";
import { useRouter } from "next/router";
import { baseUrl } from "@/context/constants";
import getGQLRequest from "@/snippets/getGQLRequest";

import Modal from "@acme/ui/Modal";

const EditEvent = ({ events }) => {
  const router = useRouter();
  const [eventList, setEventList] = useState(events);

  return events.id ? (
    <Modal
      eventList={eventList}
      setEventList={setEventList} // Ensure setEventList is typed for Event[]
      isEdit={true}
      isOpen={true}
      setIsOpen={() => router.back()}
      eventData={events}
    />
  ) : (
    <div className="flex h-screen flex-col items-center justify-center space-y-10">
      <div className="grid justify-items-center">
        <div className="flex flex-col items-center justify-center">
          <img
            src={`${baseUrl}/page404.gif`}
            alt="Error 404"
            className="w-full max-w-xl"
          />
        </div>
        <div className="text-textColor font-bold">
          Oops! This page does not exist
        </div>
        <div className="my-4">
          <a
            onClick={() => router.push("/events")}
            className="d-inline-block bg-themeColorMain w-64 cursor-pointer rounded-full py-2 text-center font-bold text-black"
          >
            Back to Events
          </a>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const { profile } = req.cookies;
  const { id } = req.__NEXT_INIT_QUERY;

  const { events } = await getGQLRequest({
    endpoint: "events",
    fields:
      "id, title, start, end, image {url},desciption, lesson {id},url,location",
    where: `editable: true, author: { id: ${profile} },id:${id}`,
  });

  return {
    props: {
      events: events.length ? events[0] : [],
    },
  };
}

export default EditEvent;
