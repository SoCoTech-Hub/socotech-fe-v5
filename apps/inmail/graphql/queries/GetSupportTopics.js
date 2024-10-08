import { gql } from "@apollo/client"

const GetSupportTopics = gql`
query GetSupportTopics {
  supportTopics(sort: "name:asc") {
    id
    name
  }
}
`
export default GetSupportTopics