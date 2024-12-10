import { gql } from '@apollo/client'

const GetDropdownData = gql`
	query GetDropdownData {
		genders(sort: "name:asc") {
			id
			name
		}
		provinces(sort: "name:asc") {
			id
			name
		}
		grades(sort: "name:asc") {
			id
			name
		}
		userRelations(sort: "name:asc") {
			id
			name
		}
	}
`
export default GetDropdownData
