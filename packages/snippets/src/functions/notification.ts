import { useEffect, useState } from "react";

import { api } from "../api/api";
import { profileId } from "../context/constants";
import getNotificationResponses from "./notificationResponses/getNotificationResponses";

interface NotificationResponse {
  id: string;
  notification: {
    title: string;
    body: string;
  };
}

interface NotificationProps {
  id: string;
  notification: {
    title: string;
    body: string;
  };
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (profileId) {
        try {
          const {
            notificationResponses,
          }: { notificationResponses: NotificationResponse[] } =
            await getNotificationResponses({
              profileId,
            });
          setNotifications(notificationResponses || []);
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
        }
      }
    };

    fetchNotifications();
  }, [profileId]);

  useEffect(() => {
    const handleNotifications = async () => {
      if (notifications.length > 0) {
        askNotificationPermission();

        if (Notification.permission === "granted") {
          notifications.forEach((notification) => {
            createNotification({
              title: notification.notification.title,
              body: notification.notification.body,
              id: notification.id,
            });
          });
        }
      }
    };

    handleNotifications();
  }, [notifications]);

  const askNotificationPermission = () => {
    if (!("Notification" in window)) {
      console.warn("This browser does not support notifications.");
      return;
    }

    if (checkNotificationPromise()) {
      Notification.requestPermission().then((permission) => {
        handlePermission(permission as NotificationPermission);
      });
    } else {
      Notification.requestPermission((permission) => {
        handlePermission(permission as NotificationPermission);
      });
    }
  };

  const handlePermission = (permission: NotificationPermission) => {
    if (permission === "granted") {
      console.log("Notifications are allowed.");
    } else {
      console.warn("Notifications are not allowed.");
    }
  };

  const checkNotificationPromise = () => {
    try {
      Notification.requestPermission().then();
    } catch (e) {
      return false;
    }
    return true;
  };

  const createNotification = (props: {
    title: string;
    body: string;
    id: string;
  }) => {
    const notification = new Notification(props.title, { body: props.body });
    notification.onclick = () =>
      console.log(`Notification clicked: ${props.id}`);
    sentNotification(props.id);
  };

  const sentNotification = async (id: string) => {
    try {
      await api.PUT(`/notification-responses/${id}`, {
        read: true,
        new: false,
      });
    } catch (error) {
      console.error(
        `Failed to update notification status for ID ${id}:`,
        error,
      );
    }
  };

  return null; // Component renders nothing visually
}
