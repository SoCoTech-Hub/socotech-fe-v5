import { gql } from '@apollo/client'

const InMailDraft = gql`
	query InMailDraft($id: Int) {
		mailResponses(
			sort: "updated_at:desc"
			where: {
				_and: [
					{ _or: [{ profile: { id: $id } }] }
					{ _or: [{ inMail: { draft: true } }] }
					{ _or: [{ deleted: false }] }
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
				body
				subject
				created_at
				draft
			}
			starred
			important
			deleted
			created_at
		}
	}
`
export default InMailDraft
