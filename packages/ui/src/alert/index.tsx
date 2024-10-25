// interface AlertProps {
//   error?: string;
//   success?: string;
// }

// const Alert: React.FC<AlertProps> = ({ error, success }) => {
//   if (error) {
//     return (
//       <div
//         className="alert alert-danger alert-dismissible fade show"
//         role="alert"
//       >
//         <strong>Error!</strong> {error}
//       </div>
//     );
//   } else if (success) {
//     return (
//       <div
//         className="alert alert-success alert-dismissible fade show"
//         role="alert"
//       >
//         <strong>Success!</strong> {success}
//       </div>
//     );
//   } else {
//     return <></>;
//   }
// };

// export default Alert;
"use client";

import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

const alertVariants = cva(
  "fixed bottom-4 left-4 w-full max-w-sm rounded-lg border p-4 shadow-lg transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "border-primary/50 bg-primary text-primary-foreground",
        destructive:
          "border-destructive/50 bg-destructive text-destructive-foreground",
        success: "border-green-600/50 bg-green-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  message: string;
  duration?: number;
  onClose?: () => void;
}

export function PopupAlert({
  className,
  variant,
  message,
  duration = 5000,
  onClose,
  ...props
}: AlertProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose && onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const IconComponent =
    variant === "destructive"
      ? AlertCircle
      : variant === "success"
        ? CheckCircle
        : Info;

  return (
    <div
      className={cn(
        alertVariants({ variant }),
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        className,
      )}
      role="alert"
      {...props}
    >
      <div className="flex items-start">
        <IconComponent className="mr-2 h-5 w-5 flex-shrink-0" />
        <div className="flex-1">{message}</div>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose && onClose();
          }}
          className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
          aria-label="Close alert"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// USE:
/*
'use client'

import {useState} from 'react'
import { PopupAlert } from './popup-alert'
import { Button } from '@/components/ui/button'

export default function PopupAlertExample() {
  const [showAlert, setShowAlert] = useState(false)
  const [alertVariant, setAlertVariant] = useState<'default' | 'destructive' | 'success'>('default')

  const handleShowAlert = (variant: 'default' | 'destructive' | 'success') => {
    setAlertVariant(variant)
    setShowAlert(true)
  }

  return (
    <div className="p-4">
      <div className="space-x-2">
        <Button onClick={() => handleShowAlert('default')}>Show Default Alert</Button>
        <Button onClick={() => handleShowAlert('destructive')} variant="destructive">Show Destructive Alert</Button>
        <Button onClick={() => handleShowAlert('success')} className="text-white bg-green-500 hover:bg-green-600">Show Success Alert</Button>
      </div>
      {showAlert && (
        <PopupAlert
          variant={alertVariant}
          message={`This is a ${alertVariant} alert that will appear in the bottom left and disappear in 5 seconds.`}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  )
}
*/
