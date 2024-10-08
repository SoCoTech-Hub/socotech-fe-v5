import { gql } from "@apollo/client"

const InMailSetRead = gql`
  mutation InMailSetRead($id: ID!, $read: Boolean) {
    updateMailResponse(input: { where: { id: $id }, data: { read: $read } }) {
      mailResponse {
        id
        read
      }
    }
  }
`
export default InMailSetRead