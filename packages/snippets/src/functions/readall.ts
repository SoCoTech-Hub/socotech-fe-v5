import { api } from "../api/api";
import { profileId } from "../context/constants";
import getNotificationResponses from "./notificationResponses/getNotificationResponses";

interface Notification {
  id: string;
  read: boolean;
}

const ReadAllUpdate = async ({
  notificationList,
}: {
  notificationList: Notification[];
}) => {
  if (!Array.isArray(notificationList) || notificationList.length === 0) {
    return;
  }

  const unreadNotifications = notificationList.filter(
    (notification) => !notification.read,
  );

  if (unreadNotifications.length === 0) {
    return;
  }

  await Promise.all(
    unreadNotifications.map((notification) =>
      api.PUT(`/notification-responses/${notification.id}`, { read: true }),
    ),
  );

  // Refresh notifications
  await getNotificationResponses({ profileId });

  return;
};

export default ReadAllUpdate;
