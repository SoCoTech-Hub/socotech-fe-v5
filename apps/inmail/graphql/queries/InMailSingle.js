import { gql } from "@apollo/client"

const InMailSingle = gql`
  query InMailSingle($id: ID!) {
    inMails(where: { id: $id }) {
      id
      from {
        id
        firstName
        lastName
        profilePic{
          url
        }
      }
      subject
      body
      to {
        id
        firstName
        lastName
      }
      cc {
        id
        firstName
        lastName
      }
      bcc {
        id
        firstName
        lastName
      }
      attachments {
        id
        url
        formats
        mime
      }
      reply
      created_at
    }
  }
`
export default InMailSingle