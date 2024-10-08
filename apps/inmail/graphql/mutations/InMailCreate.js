import { gql } from "@apollo/client"

const InMailCreate = gql`
mutation InMailCreate(
  $from: ID!
  $subject: String
  $body: String
  $draft: Boolean
  $reply: Boolean
  $attachments: [ID]
  $to: [ID]
  $cc: [ID]
  $bcc: [ID]
) {
  createInMail(
    input: {
      data: {
        from: $from
        subject: $subject
        body: $body
        draft: $draft
        reply: $reply
        attachments: $attachments
        to: $to
        cc: $cc
        bcc: $bcc
      }
    }
  ) {
    inMail {
      id
      from {
        id
      }
      subject
      body
      draft
      reply
      attachments {
        id
      }
      to {
        id
      }
      cc {
        id
      }
      bcc {
        id
      }
    }
  }
}
`
export default InMailCreate