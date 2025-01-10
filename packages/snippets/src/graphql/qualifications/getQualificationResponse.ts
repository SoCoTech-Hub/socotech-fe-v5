import { gql } from "graphql-tag";

export const GET_QUALIFICATION_RESPONSE = gql`
  query GetQualificationResponse($where: JSON!) {
    qualificationResponses(where: $where) {
      id
    }
  }
`;
