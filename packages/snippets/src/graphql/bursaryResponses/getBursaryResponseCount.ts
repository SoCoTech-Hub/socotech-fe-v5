import { gql } from "graphql-tag";

export const GET_BURSARY_RESPONSE_COUNT = gql`
  query GetBursaryResponses($bursaryId: ID!) {
    bursaryResponsesConnection(where: { bursary: { id: $bursaryId } }) {
      aggregate {
        count
      }
    }
  }
`;
