import { gql } from "graphql-tag";

export const GET_EVENTS_LIST = gql`
  query GetEventsList($where: JSON!) {
    events(where: $where) {
      id
      start
      end
      title
      private
    }
  }
`;
