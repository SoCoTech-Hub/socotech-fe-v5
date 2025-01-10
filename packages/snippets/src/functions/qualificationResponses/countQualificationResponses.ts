import { runQuery } from "../../graphql";
import { GET_QUALIFICATION_RESPONSES_COUNT } from "../../graphql/qualificationResponses/getQualificationResponsesCount";

interface CountQualificationResponsesParams {
  selectedId: string;
}

interface CountQualificationResponsesResponse {
  qualificationResponses: number;
}

export default async function countQualificationResponses({
  selectedId,
}: CountQualificationResponsesParams): Promise<CountQualificationResponsesResponse> {
  try {
    const { qualificationResponsesConnection } = await runQuery<{
      qualificationResponsesConnection: {
        aggregate: { count: number };
      };
    }>(GET_QUALIFICATION_RESPONSES_COUNT, { qualificationId: selectedId });

    return {
      qualificationResponses: qualificationResponsesConnection.aggregate.count,
    };
  } catch (error: any) {
    console.error("Error fetching qualification responses count:", error);
    return {
      qualificationResponses: 0,
    };
  }
}
