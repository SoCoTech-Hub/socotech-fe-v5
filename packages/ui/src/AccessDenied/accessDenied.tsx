"use client";

import React from // { useState } //TODO: Future Feature, request access to the platform and fix styling
"react";
import { AlertCircle, Lock } from "lucide-react";

import { Button } from "../button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";

interface AccessDeniedModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  // onRequestAccess?: () => void;
  title?: string;
  description?: string;
}

export default function Component({
  isOpen = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose = () => {},
  // onRequestAccess = () => {},
  title = "Access Denied",
  description = "This area is restricted. Please contact the administrator.",
}: AccessDeniedModalProps) {
  // const [isRequesting, setIsRequesting] = useState(false);

  // const handleRequestAccess = async () => {
  //   setIsRequesting(true);
  //   await onRequestAccess();
  //   setIsRequesting(false);
  // };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-destructive sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-destructiveForeground flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-4">
          <Lock className="text-destructiveForeground h-16 w-16" />
        </div>
        <DialogFooter className="sm:justify-center">
          <Button type="button" variant="secondary" onClick={onClose}>
            Go Back
          </Button>
          {/* <Button
            type="button"
            onClick={handleRequestAccess}
            disabled={isRequesting}
          >
            {isRequesting ? "Requesting..." : "Request Access"}
          </Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
