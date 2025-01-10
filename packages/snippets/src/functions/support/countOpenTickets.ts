import { runQuery } from "../../graphql";
import { GET_OPEN_TICKETS_COUNT } from "../../graphql/support/getOpenTicketsCount";

interface CountOpenTicketsParams {
  profileId: string;
}

interface CountOpenTicketsResponse {
  supportTickets: number;
}

export default async function countOpenTickets({
  profileId,
}: CountOpenTicketsParams): Promise<CountOpenTicketsResponse> {
  try {
    const { supportTicketsConnection } = await runQuery<{
      supportTicketsConnection: {
        aggregate: { count: number };
      };
    }>(GET_OPEN_TICKETS_COUNT, { profileId });

    return {
      supportTickets: supportTicketsConnection.aggregate.count,
    };
  } catch (error: any) {
    console.error("Error fetching open tickets count:", error);
    return {
      supportTickets: 0,
    };
  }
}
