/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  const title = data.title || "New Notification";
  const options: NotificationOptions = {
    body: data.body || "You have a new notification.",
    icon: data.icon || "/icon.png",
    badge: data.badge || "/badge.png",
    data: data.url || "/",
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data));
});
