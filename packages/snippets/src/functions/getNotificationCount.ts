import { userId } from "../context/constants";
import countNotifications from "./notifications/countNotifications";

const notificationCount = async () => {
  let result = await countNotifications({ userId });
  return result.notifications;
};
export default notificationCount;
