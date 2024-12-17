"use client";

import { X } from "lucide-react";

import { cn } from "..";
import { Button } from "../button";
import { ScrollArea } from "../scroll-area";

interface LeftDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const LeftDrawer: React.FC<LeftDrawerProps> = ({
  isOpen,
  onClose,
  children,
  title = "Menu",
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 transform bg-background shadow-lg transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-grow p-4">{children}</ScrollArea>
        </div>
      </div>
    </>
  );
};

export default LeftDrawer;
