import { gql } from '@apollo/client'

const InMailSent = gql`
	query InMailSent($id: Int) {
		mailResponses(
			sort: "updated_at:desc"
			where: {
				_and: [
					{ profile: { id: $id } }
					{ inMail: { draft: false, from: { id: $id } } }
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
export default InMailSent
