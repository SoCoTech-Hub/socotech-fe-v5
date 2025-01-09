import { gql } from "graphql-tag";

export const GET_VOUCHER = gql`
  query GetVoucher($number: String!) {
    vouchers(where: { number: $number }) {
      id
    }
  }
`;
