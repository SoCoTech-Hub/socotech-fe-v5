import { gql } from "graphql-tag";

export const GET_ORGANIZATION_MERCHANT_ID = gql`
	query GetOrganizationMerchantId {
		organization($id:string) {
			merchantId
		}
	}
`;

export const GET_ORGANIZATION_LOGOS = gql`
	query GetOrganizationMerchantId {
		organization($id:string) {
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
