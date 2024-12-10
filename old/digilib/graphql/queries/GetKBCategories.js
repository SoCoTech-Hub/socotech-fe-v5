import { gql } from '@apollo/client'

const GetKBCategories = gql`
	query GetKBCategories($orgID: ID!) {
		kbCategories(sort: "id:desc", where: { organization: { id: $orgID } }) {
			id
			name
			description
			image {
				url
			}
			bgColor
		}
	}
`
export default GetKBCategories
