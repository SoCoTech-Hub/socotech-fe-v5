"use client";

import type { VariantProps } from "class-variance-authority";
import React, { useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

import { cn } from "..";

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
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
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
        className,
      )}
      role="alert"
      {...props}
    >
      <div className="flex items-start">
        <IconComponent className="flex-shrink-0 w-5 h-5 mr-2" />
        <div className="flex-1">{message}</div>
        <button
          onClick={() => {
            setIsVisible(false);
            onClose && onClose();
          }}
          className="inline-flex items-center justify-center w-6 h-6 ml-4 rounded-full bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
          aria-label="Close alert"
        >
          <X className="w-4 h-4" />
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
import { Button } from '@acme/ui/button'

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
