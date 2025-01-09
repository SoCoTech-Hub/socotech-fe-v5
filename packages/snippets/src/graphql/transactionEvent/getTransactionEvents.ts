import { gql } from "graphql-tag";

export const GET_TRANSACTION_EVENTS = gql`
  query GetTransactionEvents($eventId: String!) {
    transactionEvents(where: { eventId: $eventId }) {
      created_at
      type
    }
  }
`;
