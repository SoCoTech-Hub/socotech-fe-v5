import { gql } from '@apollo/client'

const date = new Date().toISOString()

const GetSubjectCategories = gql`
	query GetSubjectCategories($orgID: ID!) {
		subjectCategories(where: { organization: { id: $orgID } }) {
			id
			name
			subjects {
				id
				name
				color
				icon {url}
			}
		},
		lessons(where: { organization: { id: $orgID },published_at_lt:"${date}" }) {
			subjectCategory {
				id
			}
			subject {
				id
			}
		}
	}
`
export default GetSubjectCategories
