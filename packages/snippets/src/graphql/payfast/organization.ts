import { gql } from "graphql-tag";

export const GET_ORGANIZATION_MERCHANT_ID = gql`
  query GetOrganizationMerchantId {
    organization(id: $id) {
      merchantId
    }
  }
`;

export const GET_ORGANIZATION_DETAIL = gql`
  query GetOrganizationMerchantId {
    organization(id: $id) {
      name
      primaryColor
      secondaryColor
      logo {
        url
      }
      logoDark {
        url
      }
      orgName
      orgEmail
      orgVat
      orgUrl
      merchantId
    }
  }
`;
