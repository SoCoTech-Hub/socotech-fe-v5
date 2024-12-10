import { gql } from "@apollo/client"

const NotificationReadUpdate = gql`
mutation NotificationRead(
  $id: ID!
  $read: Boolean
) {
  updateNotificationResponse(
    input: {
      where: { id: $id }
      data: {
        read: $read
      }
    }
  ) {
    notificationResponse {
      id
      read
    }
  }
}
`
export default NotificationReadUpdate