import React, { useState } from "react";

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
  message: string;
  timestamp: string;
  onClose?: () => void;
}

export default function Modal({
  title,
  message,
  timestamp,
  onClose,
}: ModalProps) {
  const [open, setOpen] = useState<boolean>(true);
  const closeModal = () => {
    setOpen(!open);
    if (onClose) {
      onClose();
    }
  };
  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{timestamp.toLocaleString()}</DialogDescription>
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
