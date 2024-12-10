import { gql } from "@apollo/client"

const GetSupportTicketsCount = gql`
  query GetSupportTicketsCount($id: ID!) {
    newTickets: supportTicketsConnection(
      where: { createdBy: { id: $id }, supportStatus: { id: 1 }, open: true }
    ) {
      aggregate {
        count
      }
    }
    solvedTickets: supportTicketsConnection(
      where: { createdBy: { id: $id }, open: false }
    ) {
      aggregate {
        count
      }
    }
    pendingTickets: supportTicketsConnection(
      where: { createdBy: { id: $id }, open: true }
    ) {
      aggregate {
        count
      }
    }
  }
`
export default GetSupportTicketsCount
