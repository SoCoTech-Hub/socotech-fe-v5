import { gql } from "graphql-tag";

export const GET_IS_AFFILIATE = gql`
  query GetIsAffiliate($profileId: string) {
    affiliates(where: { profile: { id: $profileId } }) {
      id
      profile {
        isAffiliate
      }
    }
  }
`;
export const GET_AFFILIATE_REFERRER = gql`
  query GetIsAffiliate($uniqueId: string) {
    affiliates(where: { profile: { uniqueId: $uniqueId } }) {
      id
    }
  }
`;
