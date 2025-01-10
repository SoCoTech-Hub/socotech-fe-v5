import { runQuery } from "../../graphql";
import { GET_EVENT_RESPONSE_COUNT } from "../../graphql/eventResponses/getEventResponseCount";

interface CountEventResponsesParams {
  profileId: string;
  currentDate: Date;
  endDate: Date;
}

interface CountEventResponsesResponse {
  eventResponses: number;
}

export default async function countEventResponses({
  profileId,
}: CountEventResponsesParams): Promise<CountEventResponsesResponse> {
  const currentDate = new Date();
  const endDate = new Date();
  endDate.setDate(currentDate.getDate() + 6);
  try {
    const { eventResponsesConnection } = await runQuery<{
      eventResponsesConnection: {
        aggregate: { count: number };
      };
    }>(GET_EVENT_RESPONSE_COUNT, {
      profileId,
      currentDate: currentDate.toISOString(),
      endDate: endDate.toISOString(),
    });

    return {
      eventResponses: eventResponsesConnection.aggregate.count,
    };
  } catch (error: any) {
    console.error("Error fetching event response count:", error);
    return {
      eventResponses: 0,
    };
  }
}
