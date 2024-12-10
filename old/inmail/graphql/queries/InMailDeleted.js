import { gql } from '@apollo/client'

const InMailDeleted = gql`
	query InMailDeleted($id: Int) {
		mailResponses(
			sort: "updated_at:desc"
			where: { profile: { id: $id }, inMail: { draft: false }, deleted: true }
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
				updated_at
				draft
			}
			read
			starred
			important
			deleted
			created_at
			updated_at
		}
	}
`
export default InMailDeleted
