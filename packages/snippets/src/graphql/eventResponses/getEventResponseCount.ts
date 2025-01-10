import { gql } from "graphql-tag";

export const GET_EVENT_RESPONSE_COUNT = gql`
  query GetEventResponses(
    $profileId: ID!
    $currentDate: DateTime!
    $endDate: DateTime!
  ) {
    eventResponsesConnection(
      where: {
        read: 0
        profile: { id: $profileId }
        startDate_gt: $currentDate
        endDate_lt: $endDate
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
