"use client";

//import { useState } from "react" //TODO: Future Feature, request access to the platform and fix styling
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

const AccessDenied = ({
  isOpen = false,
  onClose = () => console.log("Dialog closed"),
  // onRequestAccess = () => {},
  title = "Access Denied",
  description = "This area is restricted. Please contact the administrator.",
}: AccessDeniedModalProps) => {
  // const [isRequesting, setIsRequesting] = useState(false);

  // const handleRequestAccess = async () => {
  //   setIsRequesting(true);
  //   await onRequestAccess();
  //   setIsRequesting(false);
  // };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-destructive sm:max-w-[425px]"
        aria-labelledby="access-denied-title"
        aria-describedby="access-denied-description"
      >
        <DialogHeader>
          <DialogTitle
            id="access-denied-title"
            className="flex items-center gap-2 text-destructiveForeground"
          >
            <AlertCircle className="w-5 h-5" />
            {title}
          </DialogTitle>
          <DialogDescription id="access-denied-description">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-4">
          <Lock className="w-16 h-16 text-destructiveForeground" />
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
};
export default AccessDenied;
