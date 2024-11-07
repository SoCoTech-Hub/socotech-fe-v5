import { CheckCircle2 } from "lucide-react";

import type { Notification } from "./list";
import { Card, CardContent } from "../card";

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
}

export default function NotificationItem({
  notification,
  onClick,
}: NotificationItemProps) {
  return (
    <Card
      className={`cursor-pointer ${notification.isRead ? "bg-secondary" : "bg-primary"}`}
      onClick={onClick}
    >
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <h3 className="font-semibold">{notification.title}</h3>
          <p className="truncate text-sm text-muted-foreground">
            {notification.message}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {notification.timestamp.toLocaleString()}
          </p>
        </div>
        {notification.isRead && (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        )}
      </CardContent>
    </Card>
  );
}
