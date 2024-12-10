import { gql } from "@apollo/client"

const InMailSingleDraft = gql`
  query InMailSingleDraft($inMailID: ID!) {
    inMails(where: { id: $inMailID }) {
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
      }
    	bcc{
        id
      }
      attachments {
        id
        url
        formats
        mime
        name
      }
      reply
      created_at
    }
  }
`
export default InMailSingleDraft