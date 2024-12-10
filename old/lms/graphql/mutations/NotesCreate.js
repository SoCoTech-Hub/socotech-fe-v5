import { gql } from "@apollo/client"

const NotesCreate = gql`
mutation NotesCreate(
  $name: String!,
  $note: String!,
  $read: Boolean!,
  $lessonModule: ID!,
  $subject: ID!,
  $profile: ID!,
) {
  createNote(
    input: {
      data: {
        name: $name,
      	note: $note,
      	read: $read,
      	lessonModule: $lessonModule,
      	subject: $subject,
      	profile: $profile,
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