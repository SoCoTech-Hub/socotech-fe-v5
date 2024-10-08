import { gql } from "@apollo/client"

const SetResponse = gql`
  mutation SetResponse ($id: ID!, $starred: Boolean, $important: Boolean) {
    updateMailResponse(
      input: {
        where: { id: $id }
        data: {starred: $starred, important: $important}
      }
    ){
      mailResponse {
        starred
        important
      }
    }
  } 
`
export default SetResponse