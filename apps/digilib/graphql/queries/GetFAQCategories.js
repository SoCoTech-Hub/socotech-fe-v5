import { gql } from '@apollo/client'

const GetFAQCategories = gql`
	query GetFAQCategories($orgID: ID!) {
		faqCategories(where: { organization: { id: $orgID } }) {
			id
			name
			description
			image {
				url
			}
			background {
				url
			}
		}
	}
`
export default GetFAQCategories
