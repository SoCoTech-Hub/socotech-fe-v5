/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Grip, X } from "lucide-react";
import Draggable from "react-draggable";

import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface DraggableProps {
  title?: string;
  content?: string;
  onClose?: () => void;
}

export default function DraggableContent({
  title,
  content,
  onClose,
}: DraggableProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e: any, ui: any) => {
    const { x, y } = ui;
    setPosition({ x, y });
  };

  return (
    <Draggable
      handle=".handle"
      bounds="parent"
      position={position}
      onDrag={handleDrag}
    >
      <Card className="absolute w-64 shadow-lg sm:w-80">
        <CardHeader className="handle flex cursor-move flex-row items-center justify-between p-4">
          {title && (
            <CardTitle className="flex items-center text-lg font-semibold">
              <Grip className="mr-2 h-4 w-4" />
              {title}
            </CardTitle>
          )}
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        {content && (
          <CardContent className="p-4">
            <p className="text-sm">{content}</p>
          </CardContent>
        )}
      </Card>
    </Draggable>
  );
}
