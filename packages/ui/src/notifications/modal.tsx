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
  onClose: () => void;
}

export default function NotificationModal({
  notification,
  onClose,
}: NotificationModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
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
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
