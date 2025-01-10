import { gql } from "graphql-tag";

export const GET_NOTIFICATIONS_COUNT = gql`
  query GetNotifications($userId: ID!) {
    notificationsConnection(where: { users: { id: [$userId] } }) {
      aggregate {
        count
      }
    }
  }
`;
