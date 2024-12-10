import countNotificationResponses from "@/snippets/gql/countNotificationResponses"

const getNotificationUnreadCount = async ({ profileId }) => {
  if (profileId) {
    let result = await countNotificationResponses({
      profileId,
    })
    return result.notificationResponses
  }

  return 0
}
export default getNotificationUnreadCount
