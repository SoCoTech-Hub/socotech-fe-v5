import { gql } from '@apollo/client'

const InMailInbox = gql`
	query InMailInbox($id: Int) {
		mailResponses(
			sort: "updated_at:desc"
			where: {
				_and: [
					{ profile: { id: $id } }
					{ inMail: { draft: false, from: { id_ne: $id } } }
					{ deleted: false }
				]
			}
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
		}
	}
`
export default InMailInbox
