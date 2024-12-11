"use server";

import webpush from "web-push";

webpush.setVapidDetails(
  "<mailto:your-email@example.com>",
  process.env.VAPID_PUB_KEY,
  process.env.VAPID_PRIVATE_KEY ?? "",
);

let subscription: PushSubscription | null = null;

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub;
  // TODO: store the subscription
  // await api.post('/subscriptions', { data: sub })
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  // TODO: remove the subscription
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
