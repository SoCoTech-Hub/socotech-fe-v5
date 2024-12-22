import { gql } from "graphql-tag";

export const GET_TRANSACTION_BY_PAYMENT_ID = gql`
  query GetTransactionById($mPaymentId: string!) {
    transactions(mPaymentId: $mPaymentId) {
      id
      company
      vatNr
      firstName
      lastName
      email
      addressLine1
      postalCode
      cellnr
      additionalInformation
      signature
      mPaymentId
    }
  }
`;

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($data: TransactionInput!) {
    createTransaction(data: $data) {
      id
      company
      vatNr
      firstName
      lastName
      email
      addressLine1
      postalCode
      cellnr
      additionalInformation
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction($id: ID!, $data: TransactionInput!) {
    updateTransaction(id: $id, data: $data) {
      id
      company
      vatNr
      firstName
      lastName
      email
      addressLine1
      postalCode
      cellnr
      additionalInformation
    }
  }
`;
