"use client";

import React, { useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import NotificationItem from "./item";
import NotificationModal from "./modal";
import NotificationStatusReport from "./report";

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

type SortOption = "newest" | "oldest" | "unread";

export default function NotificationList({
  initialNotifications,
}: {
  initialNotifications: Notification[];
}) {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [sortOption, setSortOption] = useState<SortOption>("newest");
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const sortNotifications = (option: SortOption) => {
    const sorted = [...notifications];
    switch (option) {
      case "newest":
        sorted.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        break;
      case "oldest":
        sorted.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        break;
      case "unread":
        sorted.sort((a, b) => (a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1));
        break;
    }
    setNotifications(sorted);
  };

  const handleSort = (value: string) => {
    setSortOption(value as SortOption);
    sortNotifications(value as SortOption);
  };

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    if (!notification.isRead) {
      const updatedNotifications = notifications.map((n) =>
        n.id === notification.id ? { ...n, isRead: true } : n,
      );
      setNotifications(updatedNotifications);
    }
  };

  const closeModal = () => setSelectedNotification(null);

  const { total, read, unread } = useMemo(() => {
    const total = notifications.length;
    const read = notifications.filter((n) => n.isRead).length;
    const unread = total - read;
    return { total, read, unread };
  }, [notifications]);

  return (
    <div className="mx-auto w-full max-w-md">
      <h2 className="mb-4 text-2xl font-bold">Notifications</h2>

      <NotificationStatusReport total={total} read={read} unread={unread} />

      <div className="mb-4">
        <Select onValueChange={handleSort} defaultValue={sortOption}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClick={() => handleNotificationClick(notification)}
          />
        ))}
      </div>
      {selectedNotification && (
        <NotificationModal
          notification={selectedNotification}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
