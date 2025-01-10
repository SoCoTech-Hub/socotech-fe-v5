import { api } from "../../api/api";
import { organizationId, profileId } from "../../context/constants";
import { runQuery } from "../../graphql";
import { GET_EVENT_RESPONSE } from "../../graphql/eventResponses/getEventResponse";

interface ChangeAttendanceParams {
  id: string;
  attendance: boolean;
  start: string;
  end: string;
}

const ChangeAttendance = async ({
  id,
  attendance,
  start,
  end,
}: ChangeAttendanceParams): Promise<void> => {
  try {
    // Fetch existing event response
    const { eventResponses } = await runQuery<{
      eventResponses: { id: string }[];
    }>(GET_EVENT_RESPONSE, {
      where: {
        _and: [
          { event: { id } },
          { event: { organization: { id: organizationId } } },
        ],
        _or: [
          { event: { teacher: { id: profileId } } },
          { event: { students: { id: profileId } } },
          { event: { author: { id: profileId } } },
        ],
        profile: { id: profileId },
      },
    });

    if (eventResponses.length > 0) {
      // Update existing event response
      await api.PUT(`/event-responses/${eventResponses[0].id}`, {
        profile: profileId,
        attending: attendance,
        start,
        end,
      });
    } else {
      // Create a new event response
      await api.POST("/event-responses", {
        profile: profileId,
        attending: attendance,
        event: id,
        start,
        end,
      });
    }
  } catch (error: any) {
    console.error("Error changing attendance:", error);
    throw error;
  }
};

export default ChangeAttendance;
