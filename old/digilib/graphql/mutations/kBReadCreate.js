import { gql } from "@apollo/client"

const kBReadCreate = gql`
mutation kBReadCreate(
  $profileID: ID!
  $knowledgeBaseID: ID!
  $kbCategoryID: ID!
  $read: Boolean!
) {
  update: createKbRead(
    input: {
      data: {
        profile: $profileID
        knowledgeBase: $knowledgeBaseID
        kbCategory: $kbCategoryID
        read: $read
      }
    }
  ) {
    kbRead {
      id
      read
    }
  }
}
`
export default kBReadCreate