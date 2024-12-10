import { gql } from '@apollo/client'

const InMailAll = gql`
	query InMailAll($id: Int) {
		mailResponses(sort: "updated_at:desc", where: { profile: { id: $id } }) {
			id
			profile {
				id
			}
			inMail {
				id
				body
				from {
					id
					firstName
					lastName
					profilePic {
						url
					}
				}
				subject
				created_at
				draft
			}
			read
			starred
			important
			deleted
			created_at
		}
	}
`
export default InMailAll
