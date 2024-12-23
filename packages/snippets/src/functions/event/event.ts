import { runQuery } from "../../graphql";
import { GET_EVENT, GET_EVENTS } from "../../graphql/event/event";

export const FetchEvent = async (eventId: string) => {
  return await runQuery<{
    event: {
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
    };
  }>(GET_EVENT, { eventId });
};

export const FetchEvents = async (
  startDate: string,
  organizationId: string,
) => {
  return await runQuery<{
    events: {
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
    }[];
  }>(GET_EVENTS, { startDate, organizationId });
};
