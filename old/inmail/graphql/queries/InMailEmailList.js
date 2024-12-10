import { gql } from "@apollo/client"

const InMailEmailList = gql`
  query InMailEmailList($orgID: Int) {
    users(where: { profile: { organization: $orgID } }) {
      profile {
        id
        uniqueId
        firstName
        lastName
      }
      email
    }
  }
`
export default InMailEmailList