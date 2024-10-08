import { gql } from "@apollo/client"

const kBReadUpdate = gql`
mutation kBReadUpdate(
  $kbReadID: ID!, $read: Boolean!
) {
 updateKbRead(
    input: {
      where: {id: $kbReadID}
      data: {
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
export default kBReadUpdate