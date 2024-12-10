import { gql } from "@apollo/client"

const GetNotifications = gql`
  query GetNotifications($profileID: ID!, $offset: Int, $limit: Int, $date: String ) {
    notifications: notificationResponses(
      start: $offset
      limit: $limit
      sort: "id:desc"
      where: { profile: { id: $profileID } }
    ) {
      id
      read
      notification {
        id
        title
        body
        author {
          profilePic {
            url
          }
        }
        created_at
      }
    }
    totalNotificationsCount: notificationResponsesConnection(
      sort: "id:desc"
      where: { profile: { id: $profileID } }
    ) {
      aggregate{
        count
      }
    }
    
    newNotificationsCount : notificationResponsesConnection(
      where: { profile: { id: $profileID } created_at_gt: $date }
    ) {
      aggregate{
        count
      }
    }
    unreadNotificationsCount : notificationResponsesConnection(
      where: { profile: { id: $profileID } read: false }
    ) {
      aggregate{
        count
      }
    }
  }
`
export default GetNotifications
