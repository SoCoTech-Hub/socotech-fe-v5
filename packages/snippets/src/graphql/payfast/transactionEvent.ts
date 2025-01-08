import { gql } from "graphql-tag";

export const GET_TRANSACTION_EVENTS = gql`
  query GetTransactionEvents {
    transactionEvents(
      where: { transaction: { id: $transactionId }, paymentId: $paymentId }
    ) {
      id
      type
    }
  }
`;
