"use client";

import type { DraggableData, DraggableEvent } from "react-draggable";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

import type { Question } from "./quiz";
import { Card, CardContent } from "../card";
import { Label } from "../label";

interface MatrixSortQuestionProps {
  question: Question;
  onAnswer: (answer: { [key: string]: string[] }) => void;
  answer: { [key: string]: string[] };
}

export default function MatrixSortQuestion({
  question,
  onAnswer,
  answer,
}: MatrixSortQuestionProps) {
  const [columns, setColumns] = useState(answer || question.matrixData || {});
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onAnswer(columns);
  }, [columns, onAnswer]);

  const onDragStart = (item: string) => {
    setDraggedItem(item);
  };

  const onDragStop = (
    e: DraggableEvent,
    data: DraggableData,
    item: string,
    sourceColumnId: string,
  ) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const itemRect = (e.target as HTMLElement).getBoundingClientRect();

    const centerX = itemRect.left + itemRect.width / 2;
    const centerY = itemRect.top + itemRect.height / 2;

    let targetColumnId = sourceColumnId;

    Object.entries(columns).forEach(([columnId, columnItems]) => {
      const columnElement = document.getElementById(`column-${columnId}`);
      if (columnElement) {
        const columnRect = columnElement.getBoundingClientRect();
        if (
          centerX >= columnRect.left &&
          centerX <= columnRect.right &&
          centerY >= columnRect.top &&
          centerY <= columnRect.bottom
        ) {
          targetColumnId = columnId;
        }
      }
    });

    if (targetColumnId !== sourceColumnId) {
      const newColumns = { ...columns };
      newColumns[sourceColumnId] = newColumns[sourceColumnId].filter(
        (i) => i !== item,
      );
      newColumns[targetColumnId] = [...newColumns[targetColumnId], item];
      setColumns(newColumns);
    }

    setDraggedItem(null);
  };

  return (
    <div ref={containerRef}>
      <Label className="mb-4 text-lg font-medium">{question.question}</Label>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(columns).map(([columnId, columnItems]) => (
          <div
            key={columnId}
            id={`column-${columnId}`}
            className="rounded-lg border p-4"
          >
            <h3 className="mb-2 font-medium">{columnId}</h3>
            {columnItems.map((item) => (
              <Draggable
                key={item}
                onStart={() => onDragStart(item)}
                onStop={(e, data) => onDragStop(e, data, item, columnId)}
                position={{ x: 0, y: 0 }}
              >
                <div>
                  <Card
                    className={`mb-2 cursor-move p-2 ${draggedItem === item ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    <CardContent className="p-2">{item}</CardContent>
                  </Card>
                </div>
              </Draggable>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
