/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

interface PushEvent extends ExtendableEvent {
  data: PushMessageData | null;
}

interface PushData {
  title: string;
  body: string;
  url: string;
}

self.addEventListener("push", function (event: PushEvent) {
  if (event.data) {
    const data: PushData = event.data.json() as PushData;
    const options: NotificationOptions = {
      body: data.body,
      icon: "/icon.png",
      badge: "/badge.png",
      data: data.url,
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("notificationclick", function (event: NotificationEvent) {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data as string));
});

export {};
