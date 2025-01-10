import { gql } from "graphql-tag";

export const GET_EVENT_RESPONSE = gql`
  query GetEventResponse($where: JSON!) {
    eventResponses(where: $where) {
      id
    }
  }
`;
