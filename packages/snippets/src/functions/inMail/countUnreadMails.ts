import { runQuery } from "../../graphql";
import { GET_UNREAD_MAILS_COUNT } from "../../graphql/mails/getUnreadMailsCount";

interface CountUnreadMailsParams {
  profileId: string;
}

interface CountUnreadMailsResponse {
  inMails: number;
}

export default async function countUnreadMails({
  profileId,
}: CountUnreadMailsParams): Promise<CountUnreadMailsResponse> {
  try {
    const { mailResponsesConnection } = await runQuery<{
      mailResponsesConnection: {
        aggregate: { count: number };
      };
    }>(GET_UNREAD_MAILS_COUNT, { profileId });

    return {
      inMails: mailResponsesConnection.aggregate.count,
    };
  } catch (error: any) {
    console.error("Error fetching unread mails count:", error);
    return {
      inMails: 0,
    };
  }
}
