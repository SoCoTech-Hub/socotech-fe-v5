import type { FC } from "react";
import React from "react";

import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../dialog";

interface DeleteModalProps {
  id: string;
  name: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refetchNotes: () => void;
  onDelete: (id: string) => Promise<void>;
}

export const DeleteModal: FC<DeleteModalProps> = ({
  id,
  name,
  isOpen,
  setIsOpen,
  refetchNotes,
  onDelete,
}) => {
  const handleDelete = async () => {
    await onDelete(id);
    setIsOpen(false);
    refetchNotes();
  };

  const handleClose = () => setIsOpen(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {name}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this {name.toLowerCase()}? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
