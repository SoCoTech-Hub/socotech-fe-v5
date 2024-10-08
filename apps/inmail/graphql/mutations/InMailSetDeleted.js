import { gql } from "@apollo/client"

const InMailSetDeleted = gql`
  mutation InMailSetDeleted($id: ID!, $deleted: Boolean) {
    updateMailResponse(
      input: { where: { id: $id }, data: { deleted: $deleted } }
    ) {
      mailResponse {
        id
        deleted
      }
    }
  }
`
export default InMailSetDeleted