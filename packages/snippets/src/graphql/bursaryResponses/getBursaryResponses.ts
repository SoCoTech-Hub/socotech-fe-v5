import { gql } from "graphql-tag";

export const GET_BURSARY_RESPONSES = gql`
  query GetBursaryResponses($profileId: ID!, $bursaryId: ID!) {
    bursaryResponses(
      where: { profile: { id: $profileId }, bursary: { id: $bursaryId } }
    ) {
      id
      bursary {
        url
      }
    }
  }
`;
