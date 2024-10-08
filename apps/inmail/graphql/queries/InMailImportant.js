import { gql } from '@apollo/client'

const InMailImportant = gql`
	query InMailImportant($id: Int) {
		mailResponses(
			sort: "updated_at:desc"
			where: { profile: { id: $id }, important: true }
		) {
			id
			profile {
				id
			}
			inMail {
				id
				from {
					id
					firstName
					lastName
					profilePic {
						url
					}
				}
				subject
				body
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
export default InMailImportant
