import { gql } from "graphql-tag";

export const GET_NOTIFICATION_RESPONSES = gql`
  query GetNotificationResponses($profileId: ID!) {
    notificationResponses(
      where: { read: false, new: true, profile: { id: $profileId } }
    ) {
      id
      notification {
        title
        body
      }
    }
  }
`;
