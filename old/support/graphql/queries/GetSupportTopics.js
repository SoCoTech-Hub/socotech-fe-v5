import { gql } from "@apollo/client"

const GetSupportTopics = gql`
query GetSupportTopics {
  supportTopics(sort: "id:desc") {
    id
    name
  }
}
`
export default GetSupportTopics