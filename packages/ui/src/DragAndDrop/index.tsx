"use client";

import { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import { cn } from "../";
import { Button } from "../button";
import { Card, CardContent } from "../card";

interface Item {
  id: string;
  content: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
}

interface MatrixSortProps {
  items: Item[];
  categories: Category[];
  onComplete: (result: { [key: string]: string[] }) => void;
}

const DraggableItem: React.FC<{
  item: Item;
  onDrop: (item: Item, category: string) => void;
}> = ({ item, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ITEM",
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={cn(
        "mb-2 cursor-move rounded bg-white p-2 shadow",
        isDragging && "opacity-50",
      )}
    >
      {item.content}
    </div>
  );
};

const DroppableCategory: React.FC<{
  category: Category;
  items: Item[];
  onDrop: (item: Item, category: string) => void;
}> = ({ category, items, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (droppedItem: { id: string }) => {
      const item = items.find((i) => i.id === droppedItem.id);
      if (item) onDrop(item, category.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={cn(
        "min-h-[100px] rounded bg-gray-100 p-4",
        isOver && "bg-blue-100",
      )}
    >
      <h3 className="mb-2 font-bold">{category.name}</h3>
      {items
        .filter((item) => item.category === category.id)
        .map((item) => (
          <div key={item.id} className="mb-2 rounded bg-white p-2 shadow">
            {item.content}
          </div>
        ))}
    </div>
  );
};

export const MatrixSort: React.FC<MatrixSortProps> = ({
  items: initialItems,
  categories,
  onComplete,
}) => {
  const [items, setItems] = useState<Item[]>(initialItems);

  const handleDrop = (item: Item, categoryId: string) => {
    setItems((prevItems) =>
      prevItems.map((i) =>
        i.id === item.id ? { ...i, category: categoryId } : i,
      ),
    );
  };

  const handleComplete = () => {
    const result = categories.reduce(
      (acc, category) => {
        acc[category.id] = items
          .filter((item) => item.category === category.id)
          .map((item) => item.id);
        return acc;
      },
      {} as { [key: string]: string[] },
    );
    onComplete(result);
  };

  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  const Backend = isTouchDevice ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={Backend}>
      <Card className="p-4">
        <CardContent>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h2 className="mb-2 text-lg font-bold">Items to Sort</h2>
              {items
                .filter((item) => !item.category)
                .map((item) => (
                  <DraggableItem
                    key={item.id}
                    item={item}
                    onDrop={handleDrop}
                  />
                ))}
            </div>
            <div className="grid grid-cols-1 gap-4">
              {categories.map((category) => (
                <DroppableCategory
                  key={category.id}
                  category={category}
                  items={items}
                  onDrop={handleDrop}
                />
              ))}
            </div>
          </div>
          <Button onClick={handleComplete}>Complete</Button>
        </CardContent>
      </Card>
    </DndProvider>
  );
};

export default MatrixSort;
