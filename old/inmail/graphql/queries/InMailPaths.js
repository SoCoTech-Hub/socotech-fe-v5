import { gql } from "@apollo/client"

const InMailPaths = gql`
  query InMailPaths {
    inMails {
      id
    }
  }
`
export default InMailPaths