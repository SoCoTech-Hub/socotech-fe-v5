import { gql } from "graphql-tag";

export const GET_EVENT_FOR_REMOVAL = gql`
  query GetEventForRemoval($where: JSON!) {
    events(where: $where) {
      id
    }
  }
`;
