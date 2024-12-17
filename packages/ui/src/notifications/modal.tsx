import { useState } from "react";

import type { Notification } from "./list";
import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";

interface NotificationModalProps {
  notification: Notification;
  onClose?: () => void;
}

export default function NotificationModal({
  notification,
  onClose,
}: NotificationModalProps) {
  const [open, setOpen] = useState<boolean>(true);
  const closeModal = () => {
    setOpen(!open);
    if (onClose) {
      onClose();
    }
  };
  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{notification.title}</DialogTitle>
          <DialogDescription>
            {notification.timestamp.toLocaleString()}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p>{notification.message}</p>
        </div>
        <DialogFooter>
          <Button onClick={closeModal}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
