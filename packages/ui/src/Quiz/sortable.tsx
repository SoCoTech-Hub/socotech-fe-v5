"use client";

import type { DraggableData, DraggableEvent } from "react-draggable";
import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, GripVertical, XCircle } from "lucide-react";
import Draggable from "react-draggable";

import { Button } from "../button";
import { Card, CardContent } from "../card";

interface QuizItem {
  id: string;
  content: string;
}

interface SortableQuizListProps {
  items: QuizItem[];
  correctOrder: string[];
  onReorder: (newItems: QuizItem[]) => void;
}

export default function Sortable({
  items: initialItems,
  correctOrder,
  onReorder,
}: SortableQuizListProps) {
  const [items, setItems] = useState(initialItems);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [checkedAnswers, setCheckedAnswers] = useState<boolean[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const onDragStart = (id: string) => {
    setDraggingId(id);
  };

  const onDragStop = (e: DraggableEvent, data: DraggableData, id: string) => {
    setDraggingId(null);
    if (!listRef.current) return;

    const itemElements = Array.from(listRef.current.children);
    const itemPositions = itemElements.map(
      (el) => el.getBoundingClientRect().top,
    );
    const draggedIndex = items.findIndex((item) => item.id === id);
    const draggedTop = data.y + itemPositions[draggedIndex];

    let newIndex = itemPositions.findIndex((top) => draggedTop < top);
    if (newIndex === -1) newIndex = itemPositions.length;

    if (newIndex !== draggedIndex) {
      const newItems = Array.from(items);
      const [reorderedItem] = newItems.splice(draggedIndex, 1);
      newItems.splice(newIndex, 0, reorderedItem);
      setItems(newItems);
      onReorder(newItems);
      setCheckedAnswers([]);
    }
  };

  const checkAnswers = () => {
    const currentOrder = items.map((item) => item.id);
    const newCheckedAnswers = currentOrder.map(
      (id, index) => id === correctOrder[index],
    );
    setCheckedAnswers(newCheckedAnswers);
  };

  return (
    <div className="space-y-4">
      <ul ref={listRef} className="space-y-2">
        {items.map((item, index) => (
          <Draggable
            key={item.id}
            axis="y"
            handle=".handle"
            position={{ x: 0, y: 0 }}
            grid={[25, 25]}
            scale={1}
            onStart={() => onDragStart(item.id)}
            onStop={(e, data) => onDragStop(e, data, item.id)}
          >
            <li className={`${draggingId === item.id ? "opacity-50" : ""}`}>
              <Card>
                <CardContent className="flex items-center space-x-4 p-4">
                  <span className="handle cursor-move">
                    <GripVertical className="h-5 w-5 text-gray-500" />
                  </span>
                  <span className="flex-grow">{item.content}</span>
                  {checkedAnswers[index] !== undefined &&
                    (checkedAnswers[index] ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ))}
                </CardContent>
              </Card>
            </li>
          </Draggable>
        ))}
      </ul>
      <Button onClick={checkAnswers} className="w-full">
        Check Answers
      </Button>
    </div>
  );
}
