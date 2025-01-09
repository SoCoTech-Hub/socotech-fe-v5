import { gql } from "graphql-tag";

export const GET_PROFILES_BY_VOUCHER = gql`
  query GetProfilesByVoucher($voucherId: String!) {
    profiles(where: { voucher: $voucherId }) {
      id
    }
  }
`;
