"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Label } from "../label";
import { Switch } from "../switch";
import {
  checkSubscriptionStatus,
  subscribeToPushNotifications,
  unsubscribeFromPushNotifications,
} from "./push-notifications";

interface NotificationManagerProps {
  title?: string;
  description?: string;
  onSubscriptionChange?: (isSubscribed: boolean) => void;
}

export default function NotificationManager({
  title = "Push Notifications",
  description = "Manage your push notification preferences.",
  onSubscriptionChange,
}: NotificationManagerProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initializeSubscriptionStatus() {
      const status = await checkSubscriptionStatus();
      setIsSubscribed(status);
      setIsLoading(false);
    }
    void initializeSubscriptionStatus();
  }, []);

  const handleSubscriptionChange = async (checked: boolean) => {
    setIsLoading(true);
    try {
      if (checked) {
        await subscribeToPushNotifications();
        setIsSubscribed(true);
        onSubscriptionChange?.(true);
      } else {
        await unsubscribeFromPushNotifications();
        setIsSubscribed(false);
        onSubscriptionChange?.(false);
      }
    } catch (error) {
      console.error("Failed to manage subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {isSubscribed ? (
            <Bell className="h-6 w-6" />
          ) : (
            <BellOff className="h-6 w-6" />
          )}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Switch
            id="push-notifications"
            checked={isSubscribed}
            onCheckedChange={handleSubscriptionChange}
          />
          <Label htmlFor="push-notifications">
            {isSubscribed ? "Enabled" : "Disabled"}
          </Label>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
