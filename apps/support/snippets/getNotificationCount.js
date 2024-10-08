import userid from "./getUserid"
import countNotifications from "./gql/countNotifications"

const notificationCount = async () => {
  let result = await countNotifications({
    userid,
  })
  return result.notifications
}
export default notificationCount
