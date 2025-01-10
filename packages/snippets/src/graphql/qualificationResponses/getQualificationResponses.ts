import { gql } from "graphql-tag";

export const GET_QUALIFICATION_RESPONSES = gql`
  query GetQualificationResponses($profileId: ID!, $qualificationId: ID!) {
    qualificationResponses(
      where: {
        profile: { id: $profileId }
        qualification: { id: $qualificationId }
      }
    ) {
      id
      qualification {
        url
      }
    }
  }
`;
