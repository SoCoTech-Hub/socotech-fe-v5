import {
  grades,
  organizationId,
  profileId,
  provinces,
  schools,
} from "../../context/constants";
import { runQuery } from "../../graphql";
import { GET_EVENT_BY_ID, GET_EVENTS } from "../../graphql/event/getEvents";

interface GetEventItemsParams {
  date: string | Date;
  setSelectedDay: (events: any) => void;
  itemId?: string | false;
}

export const getEventItems = async ({
  date,
  setSelectedDay,
  itemId = false,
}: GetEventItemsParams): Promise<void> => {
  const dateStart = date ? new Date(date) : new Date();
  dateStart.setHours(0, 0, 0, 0);

  const dateEnd = date ? new Date(date) : new Date();
  dateEnd.setHours(23, 59, 59, 999);

  try {
    if (itemId) {
      // Fetch single event by ID
      const event = await runQuery(GET_EVENT_BY_ID, { id: itemId });
      setSelectedDay(event);
    } else {
      // Construct `where` clause dynamically
      const where: Record<string, any> = {
        start_gte: `${dateStart.toISOString().split("T")[0]}T00:00`,
        end_lte: `${dateEnd.toISOString().split("T")[0]}T23:59`,
        _or: [
          { private: false },
          profileId && { private: true, author: { id: profileId } },
          profileId && { private: true, student: { id: profileId } },
          provinces && { province: { id: provinces } },
          grades && { grade: { id: grades } },
          schools && { school: { id: schools } },
        ].filter(Boolean),
      };

      if (organizationId) {
        where.organization = { id: organizationId };
      }

      // Fetch multiple events
      const events = await runQuery(GET_EVENTS, { where });
      setSelectedDay(events);
    }
  } catch (error: any) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
