import { gql } from '@apollo/client'

const NotesCreate = gql`
	mutation NotesCreate(
		$name: String!
		$note: String!
		$read: Boolean!
		$show: ID!
		$profile: ID!
	) {
		createNote(
			input: {
				data: {
					name: $name
					note: $note
					read: $read
					show: $show
					profile: $profile
				}
			}
		) {
			note {
				id
				note
			}
		}
	}
`
export default NotesCreate
