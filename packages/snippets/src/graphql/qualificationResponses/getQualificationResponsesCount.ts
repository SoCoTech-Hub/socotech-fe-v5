import { gql } from "graphql-tag";

export const GET_QUALIFICATION_RESPONSES_COUNT = gql`
  query GetQualificationResponses($qualificationId: ID!) {
    qualificationResponsesConnection(
      where: { qualification: { id: $qualificationId } }
    ) {
      aggregate {
        count
      }
    }
  }
`;
