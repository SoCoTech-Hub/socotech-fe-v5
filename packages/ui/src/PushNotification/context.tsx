"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { CONFIG } from "@acme/config/url";
import { api } from "@acme/snippets/api/api";
import { useProfileId } from "@acme/snippets/utils/contextUtils";

import type { PushNotificationProps } from "./notification";
import { PushNotification } from "./notification";

interface PushNotificationContextType {
  addNotification: (
    notification: Omit<PushNotificationProps, "onDismiss">,
  ) => void;
  subscribeToPushNotifications: () => Promise<void>;
}

const PushNotificationContext = createContext<
  PushNotificationContextType | undefined
>(undefined);

export function PushNotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const profileId = useProfileId();
  const [notifications, setNotifications] = useState<PushNotificationProps[]>(
    [],
  );

  const addNotification = useCallback(
    (notification: Omit<PushNotificationProps, "onDismiss">) => {
      setNotifications((prev) => [
        ...prev,
        {
          ...notification,
          onDismiss: () => {
            return;
          },
        },
      ]);
    },
    [],
  );

  const removeNotification = useCallback((index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const subscribeToPushNotifications = useCallback(async () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      try {
        const registration = await navigator.serviceWorker.register(
          "./service-worker.js",
        );
        console.log("Service Worker registered successfully:", registration);

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: CONFIG.VAPID_KEY,
        });

        console.log("Push notification subscription:", subscription);
        await api.POST("/subscriptions", { profile: { id: profileId } });

        addNotification({
          message: "Successfully subscribed to push notifications!",
          variant: "success",
          duration: 3000,
        });
      } catch (error) {
        console.error("Error subscribing to push notifications:", error);
        addNotification({
          message: "Failed to subscribe to push notifications.",
          variant: "error",
          duration: 3000,
        });
      }
    } else {
      console.log("Push notifications are not supported");
      addNotification({
        message: "Push notifications are not supported in this browser.",
        variant: "info",
        duration: 3000,
      });
    }
  }, [addNotification, profileId]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(
        function (registration) {
          console.log(
            "Service Worker registered with scope:",
            registration.scope,
          );
        },
        function (err) {
          console.log("Service Worker registration failed:", err);
        },
      );
    }
  }, []);

  return (
    <PushNotificationContext.Provider
      value={{ addNotification, subscribeToPushNotifications }}
    >
      {children}
      {notifications.map((notification, index) => (
        <PushNotification
          key={index}
          {...notification}
          onDismiss={() => removeNotification(index)}
        />
      ))}
    </PushNotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(PushNotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
}
