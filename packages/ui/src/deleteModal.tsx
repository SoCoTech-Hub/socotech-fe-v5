import type { FC } from "react";

import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

interface DeleteModalProps {
  id: string;
  name: string;
  triggerName?: string;
  refetchData: () => void;
  onDelete: () => void;
}

export const DeleteModal: FC<DeleteModalProps> = ({
  name,
  triggerName = "Delete",
  refetchData,
  onDelete,
}) => {
  const handleDelete = () => {
    onDelete();
    refetchData();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerName}</Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[305px]">
        <DialogHeader>
          <DialogTitle>Delete {name}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this {name.toLowerCase()}? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex justify-end space-x-2">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
};
