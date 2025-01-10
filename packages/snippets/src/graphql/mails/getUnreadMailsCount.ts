import { gql } from "graphql-tag";

export const GET_UNREAD_MAILS_COUNT = gql`
  query CountUnreadMails($profileId: ID!) {
    mailResponsesConnection(
      where: { read: false, profile: { id: $profileId } }
    ) {
      aggregate {
        count
      }
    }
  }
`;
