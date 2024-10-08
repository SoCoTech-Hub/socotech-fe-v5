import { gql } from "@apollo/client"

const InMailEmailListAndDraft = gql`
  query InMailSingleDraft($inMailID: ID, $orgID: Int, $draft: Boolean) {
    inMails(where: { id: $inMailID }) @skip(if: $draft) {
      id
      from {
        id
        firstName
        lastName
        profilePic {
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
      bcc {
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
    users(where: { profile: { organization: $orgID } }) {
      profile {
        id
        uniqueId
      }
      email
    }
  }
`
export default InMailEmailListAndDraft