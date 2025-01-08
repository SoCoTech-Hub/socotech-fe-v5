import { gql } from "graphql-tag";

export const GET_ORGANIZATION_MERCHANT_ID = gql`
	query GetOrganizationMerchantId {
		organization($id:string) {
			merchantId
		}
	}
`;

export const GET_ORGANIZATION_DETAIL = gql`
	query GetOrganizationMerchantId {
		organization($id:string) {
			name
			primaryColor
			secondaryColor
			logo{url}
			logoDark{url}
			orgName
			orgEmail
			orgVat
			orgUrl
			merchantId
		}
	}
`;
