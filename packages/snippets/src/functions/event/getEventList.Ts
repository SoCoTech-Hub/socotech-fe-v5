import {
  grades,
  organizationId,
  profileId,
  provinces,
  schools,
} from "../../context/constants";
import { runQuery } from "../../graphql";
import { GET_EVENTS_LIST } from "../../graphql/event/getEventsList";

interface GetEventListParams {
  setEventList: (events: any) => void;
  currentDate: Date;
  month?: boolean;
}

export const getEventList = async ({
  setEventList,
  currentDate,
  month = false,
}: GetEventListParams): Promise<void> => {
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );

  const lastDayOfMonth = month
    ? new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    : new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 6,
      );

  try {
    const where: Record<string, any> = {
      _and: [
        { start_gte: firstDayOfMonth.toISOString() },
        { end_lte: lastDayOfMonth.toISOString() },
      ],
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

    const response = await runQuery<{ events: any[] }>(GET_EVENTS_LIST, { where });
    const { events } = response;

    setEventList(events);
  } catch (error: any) {
    console.error("Error fetching event list:", error);
    throw error;
  }
};
