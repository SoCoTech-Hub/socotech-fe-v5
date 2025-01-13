"use client";

import type { VariantProps } from "class-variance-authority";
import { useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

import { cn } from "../utils";

const alertVariants = cva(
  "fixed w-full max-w-sm rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "text-primary-foreground border-primary/50 bg-primary",
        destructive:
          "text-destructive-foreground border-destructive/50 bg-destructive",
        success: "border-green-600/50 bg-green-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface PopupAlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  message: string;
  duration?: number;
  onClose?: () => void;
  visible?: boolean;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export function PopupAlert({
  className,
  variant,
  message,
  duration = 5000,
  onClose,
  visible = true,
  position = "bottom-right",
  ...props
}: PopupAlertProps) {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);

    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);

      clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!isVisible) return null;

  const IconComponent =
    variant === "destructive"
      ? AlertCircle
      : variant === "success"
        ? CheckCircle
        : Info;

  const positionClass = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  }[position];

  return (
    <div
      className={cn(alertVariants({ variant }), positionClass, className)}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      {...props}
    >
      <div className="flex items-start">
        <IconComponent className="mr-2 h-5 w-5 flex-shrink-0" />
        <div className="flex-1">{message}</div>
        <button
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 focus:ring-primary-foreground/50 ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full focus:outline-none focus:ring-2"
          aria-label="Close alert"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
