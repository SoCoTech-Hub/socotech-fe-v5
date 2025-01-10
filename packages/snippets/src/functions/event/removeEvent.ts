import { api } from "../../api/api";
import { runQuery } from "../../graphql";
import { GET_EVENT_FOR_REMOVAL } from "../../graphql/event/getEventForRemoval";

interface RemoveEventParams {
  id: string;
  organizationId: string;
}

const RemoveEvent = async ({
  id,
  organizationId,
}: RemoveEventParams): Promise<void> => {
  try {
    // Fetch event to ensure it meets criteria
    const { events } = await runQuery<{
      events: { id: string }[];
    }>(GET_EVENT_FOR_REMOVAL, {
      where: {
        editable: true,
        id,
        organization: { id: organizationId },
      },
    });

    if (events.length > 0) {
      // Event exists and is editable
      await api.DELETE(`/events/${id}`);
      console.log(`Event with ID ${id} removed successfully.`);
    } else {
      console.warn(
        `No editable event found with ID ${id} for the specified organization.`,
      );
    }
  } catch (error: any) {
    console.error("Error removing event:", error);
    throw error;
  }
};

export default RemoveEvent;
