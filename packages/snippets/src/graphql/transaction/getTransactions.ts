import { gql } from "graphql-tag";

export const GET_TRANSACTIONS = gql`
  query GetTransactions($mPaymentId: String!) {
    transactions(where: { mPaymentId: $mPaymentId }) {
      id
    }
  }
`;
