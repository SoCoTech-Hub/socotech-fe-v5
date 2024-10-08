import { gql } from "@apollo/client"

const GetSupportTicketsTable = gql`
  query GetSupportTicketsTable($id: ID!) {
    supportTickets(sort: "id:desc", where: { createdBy: { id: $id } }) {
      id
      title
      assignedTo {
        id
        firstName
        lastName
        profilePic {
          url
        }
      }
      created_at
      supportTopic {
        name
      }
      supportStatus {
        name
        color
      }
    }
  }
`
export default GetSupportTicketsTable