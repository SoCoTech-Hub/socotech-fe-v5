"use server";

import { useQuery } from "@tanstack/react-query";
import webpush from "web-push";

import { api } from "@acme/api";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
webpush.setVapidDetails(
  "<mailto:info@jbafrica.com>",
  process.env.VAPID_PUB_KEY ?? "",
  process.env.VAPID_PRIVATE_KEY ?? "",
);

let subscription: PushSubscription | null = null;

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub;
  const { data } = await api.GET("/users/me");
  // TODO: store the subscription
  await api.POST("/notification-subscribers", {
    body: { data: { user: data } },
  });
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  // TODO: remove the subscription
  await api.DELETE("/subscriptions");
  // await api.delete('/subscriptions',{ where:{ ... }})
  return { success: true };
}

export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error("No subscription available");
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Test Notification",
        body: message,
        icon: "/icon.png",
      }),
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}