import React from "react";
import { AlertCircle, Bell, CheckCircle2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "../card";

interface NotificationStatusReportProps {
  total: number;
  read: number;
  unread: number;
}

export default function NotificationStatusReport({
  total,
  read,
  unread,
}: NotificationStatusReportProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Notification Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <Bell className="mx-auto h-8 w-8 text-primary" />
            <p className="mt-2 font-medium">{total}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
          <div>
            <CheckCircle2 className="mx-auto h-8 w-8 text-green-500" />
            <p className="mt-2 font-medium">{read}</p>
            <p className="text-sm text-muted-foreground">Read</p>
          </div>
          <div>
            <AlertCircle className="mx-auto h-8 w-8 text-yellow-500" />
            <p className="mt-2 font-medium">{unread}</p>
            <p className="text-sm text-muted-foreground">Unread</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
