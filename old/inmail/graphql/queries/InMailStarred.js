import { gql } from '@apollo/client'

const InMailStarred = gql`
	query InMailStarred($id: Int) {
		mailResponses(
			sort: "updated_at:desc"
			where: { profile: { id: $id }, starred: true }
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
		}
	}
`
export default InMailStarred
