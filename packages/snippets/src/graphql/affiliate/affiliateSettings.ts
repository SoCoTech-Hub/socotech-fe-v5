import { gql } from "graphql-tag";

export const GET_AFFILIATE_SETTING_TERMS = gql`
  query GetIsAffiliate($organizationId: string) {
    affiliateSettings(where: { organization: { id: $organizationId } }) {
      terms
    }
  }
`;
