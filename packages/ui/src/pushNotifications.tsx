"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff } from "lucide-react";

import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { useToast } from "./hooks/use-toast";
import { Switch } from "./switch";

interface Notification {
  id: number;
  title: string;
  body: string;
  timestamp: Date;
}

export interface PushNotificationsProps {
  apiEndpoint: string; // API endpoint to send push notifications
  vapidPublicKey: string; // Public VAPID key for PushManager
  userId: string; // User ID for associating subscriptions
  title: string; // Title of the card
  description: string; // Description of the card
}

export function PushNotifications({
  apiEndpoint,
  vapidPublicKey,
  userId,
  title,
  description,
}: PushNotificationsProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const checkNotificationStatus = () => {
      const permission = Notification.permission;
      setIsEnabled(permission === "granted");
    };
    checkNotificationStatus();
  }, []);

  const handleToggleNotifications = async () => {
    if (!isEnabled) {
      // Request Notification permission
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        try {
          await subscribeToPushNotifications();
          setIsEnabled(true);
          toast({
            title: "Notifications enabled",
            description: "You will now receive push notifications.",
          });
        } catch (error) {
          console.error("Failed to subscribe to push notifications:", error);
          toast({
            title: "Subscription failed",
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Permission denied",
          description: "Please enable notifications in your browser settings.",
          variant: "destructive",
        });
      }
    } else {
      // Unsubscribe logic can go here
      setIsEnabled(false);
      toast({
        title: "Notifications disabled",
        description: "You will no longer receive push notifications.",
      });
    }
  };

  const subscribeToPushNotifications = async () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey,
      });

      // Send the subscription object to the server
      await fetch(`${apiEndpoint}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          subscription,
        }),
      });
    } else {
      throw new Error("Push notifications are not supported in this browser.");
    }
  };

  const simulateNewNotification = async () => {
    const newNotification: Notification = {
      id: Date.now(),
      title: "New Message",
      body: "You have a new message from a friend.",
      timestamp: new Date(),
    };
    setNotifications((prev) => [newNotification, ...prev].slice(0, 5));

    // Optionally send a notification request to the API
    await fetch(`${apiEndpoint}/send-notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        notification: {
          title: newNotification.title,
          body: newNotification.body,
        },
      }),
    });

    // Display a toast
    toast({
      title: newNotification.title,
      description: newNotification.body,
    });
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-2">
            {isEnabled ? (
              <Bell className="h-4 w-4" />
            ) : (
              <BellOff className="h-4 w-4" />
            )}
            <span>Enable Push Notifications</span>
          </div>
          <Switch
            checked={isEnabled}
            onCheckedChange={handleToggleNotifications}
            aria-label="Toggle push notifications"
          />
        </div>
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold">Recent Notifications</h3>
          {notifications.length > 0 ? (
            <ul className="space-y-2">
              {notifications.map((notification) => (
                <li key={notification.id} className="rounded bg-muted p-2">
                  <h4 className="font-medium">{notification.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {notification.body}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {notification.timestamp.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No recent notifications</p>
          )}
        </div>
        <div className="mt-4">
          <Button onClick={simulateNewNotification} disabled={!isEnabled}>
            Simulate New Notification
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
