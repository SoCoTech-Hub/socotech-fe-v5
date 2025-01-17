import { gql } from "graphql-tag";

export const GET_ORGANIZATION_LOGOS = gql`
  query GetOrganizationMerchantId {
    organization(id: $id) {
      logo {
        url
      }
      name
      logoDark {
        url
      }
    }
  }
`;
