"use server";

import webpush from "web-push";

import { api } from "@acme/api";

import { GET_ME, runQuery } from "../graphql";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
webpush.setVapidDetails(
  "<mailto:info@jbafrica.com>",
  process.env.VAPID_PUB_KEY ?? "",
  process.env.VAPID_PRIVATE_KEY ?? "",
);

let subscription: webpush.PushSubscription | null = null;

export async function subscribeUser(sub: webpush.PushSubscription) {
  try {
    const me = await runQuery<{ user: { id: string } }>(GET_ME);
    // TODO: store the subscription
    await api.POST("/notification-subscribers", {
      body: { data: { user: me.user.id, subscription: sub } },
    });
    return { success: true };
  } catch (error) {
    console.error("Subscription failed:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function unsubscribeUser() {
  subscription = null;
  // TODO: remove the subscription
  // await api.DELETE('/subscriptions',{ where:{ user:{id:userId} }}) //This needs work
  return { success: true };
}

export async function sendNotification(title?: string, message?: string) {
  if (!subscription) {
    throw new Error("No subscription available");
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: title ?? "Test Notification",
        body: message ?? "",
        icon: "/icon.png",
      }),
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
