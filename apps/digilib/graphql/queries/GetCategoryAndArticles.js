import { gql } from '@apollo/client'

const GetCategoryAndArticles = gql`
	query GetCategoryAndArticles(
		$categoryID: ID!
		$gradesID: [ID!]
		$orgID: ID!
	) {
		knowledgeBases(
			sort: "name:asc"
			where: {
				categories: $categoryID
				grades: { id: $gradesID }
				organization: { id: $orgID }
			}
		) {
			id
			link
			name
			topics {
				id
				name
			}
			categories {
				id
				name
			}
			language
			releaseYear
			grades {
				id
				name
			}
			subject {
				id
				name
			}
		}
		kbCategory(id: $categoryID) {
			id
			name
		}
	}
`
export default GetCategoryAndArticles
