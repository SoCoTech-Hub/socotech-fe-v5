import { gql } from "@apollo/client"

const InMailResponseID = gql`
  query InMailResponseID($id: ID!, $mailID: ID!) {
    mailResponses(
      sort: "id:desc"
      where: { profile: { id: $id }, inMail: { id: $mailID } }
    ) {
      id
      deleted
    }
  }
`
export default InMailResponseID