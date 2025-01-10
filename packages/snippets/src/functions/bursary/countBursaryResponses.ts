import { runQuery } from "../../graphql";
import { GET_BURSARY_RESPONSE_COUNT } from "../../graphql/bursaryResponses/getBursaryResponseCount";

interface CountBursaryResponsesResponse {
  bursaryResponses: number;
}

export default async function countBursaryResponses(
  bursaryId: string,
): Promise<CountBursaryResponsesResponse> {
  try {
    const { bursaryResponsesConnection } = await runQuery<{
      bursaryResponsesConnection: {
        aggregate: { count: number };
      };
    }>(GET_BURSARY_RESPONSE_COUNT, { bursaryId });

    return {
      bursaryResponses: bursaryResponsesConnection.aggregate.count,
    };
  } catch (error: any) {
    console.error("Error fetching bursary response count:", error);
    return {
      bursaryResponses: 0,
    };
  }
}
