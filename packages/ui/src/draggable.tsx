"use client";

import { useState } from "react";
import { Grip, X } from "lucide-react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface DraggableProps {
  title?: string;
  content?: string;
  onClose?: () => void;
}

export default function DraggableContent({
  title = "Untitled",
  content = "No content available.",
  onClose,
}: DraggableProps) {
  const [defaultPosition, setDefaultPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (_: DraggableEvent, data: DraggableData) => {
    setDefaultPosition({ x: data.x, y: data.y });
  };

  return (
    <Draggable
      handle=".handle"
      bounds="parent"
      position={defaultPosition}
      onDrag={handleDrag}
    >
      <Card className="absolute w-64 shadow-lg sm:w-80">
        <CardHeader className="handle flex cursor-move flex-row items-center justify-between p-4">
          <CardTitle className="flex items-center text-lg font-semibold">
            <Grip className="mr-2 h-4 w-4" />
            {title}
          </CardTitle>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-sm">{content}</p>
        </CardContent>
      </Card>
    </Draggable>
  );
}
