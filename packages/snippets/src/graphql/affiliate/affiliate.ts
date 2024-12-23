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
