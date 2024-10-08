import { gql } from "@apollo/client"

const GetInMailUnreadChips = gql`
	query GetInMailUnreadChips($id: ID!) {
		allMail: mailResponsesConnection(
			where: { profile: { id: $id }, read: false }
		) {
			aggregate {
				count
			}
		} # Write your query or mutation here
		inbox: mailResponsesConnection(
			where: {
				_and: [
					{ profile: { id: $id }, read: false }
					{ inMail: { draft: false, from: { id_ne: $id } } }
					{ deleted: false }
				]
			}
		) {
			aggregate {
				count
			}
		}
		drafts: mailResponsesConnection(
			where: {
				_and: [
					{ profile: { id: $id } }
					{ inMail: { draft: true } }
					{ deleted: false }
				]
			}
		) {
			aggregate {
				count
			}
		}
	}
`
export default GetInMailUnreadChips