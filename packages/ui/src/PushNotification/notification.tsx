import type { VariantProps } from "class-variance-authority";
import { useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "../utils";

const notificationVariants = cva(
  "fixed bottom-4 right-4 flex items-center justify-between rounded-lg p-4 shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-900",
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        info: "bg-blue-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface PushNotificationProps
  extends VariantProps<typeof notificationVariants> {
  message: string;
  onDismiss: () => void;
  duration?: number;
}

export function PushNotification({
  message,
  onDismiss,
  variant,
  duration = 5000,
}: PushNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  if (!isVisible) return null;

  return (
    <div className={cn(notificationVariants({ variant }))}>
      <span>{message}</span>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-4 focus:outline-none"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
