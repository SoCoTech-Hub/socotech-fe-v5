import { gql } from "@apollo/client"

const NotesUpdate = gql`
mutation NotesUpdate($id: ID!, $name: String!, $note: String!) {
  updateNote(
    input: { where: { id: $id }, data: { name: $name, note: $note } }
  ) {
    note {
     note
    }
  }
}
`
export default NotesUpdate