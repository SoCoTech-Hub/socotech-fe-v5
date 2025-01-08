import { gql } from "graphql-tag";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions(where: { m_payment_id: $paymentId, item: $itemName }) {
      id
      orgId
      firstName
      lastName
      email
      mPaymentId
      addressLine1
      postalCode
      company
      vatNr
      amount
      item
      description
    }
  }
`;
