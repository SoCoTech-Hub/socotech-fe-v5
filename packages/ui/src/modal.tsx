import { ReactNode, useState } from "react";

import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";

interface ModalProps {
  title: string;
  message: ReactNode;
  timestamp?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Modal({
  title,
  message,
  timestamp,
  isOpen = false,
  onClose,
}: ModalProps) {
  const [open, setOpen] = useState<boolean>(isOpen);
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
          <DialogTitle>{title}</DialogTitle>
          {timestamp ? (
            <DialogDescription>{timestamp.toLocaleString()}</DialogDescription>
          ) : (
            <></>
          )}
        </DialogHeader>
        <div className="mt-4">
          <p>{message}</p>
        </div>
        <DialogFooter>
          <Button onClick={closeModal}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
