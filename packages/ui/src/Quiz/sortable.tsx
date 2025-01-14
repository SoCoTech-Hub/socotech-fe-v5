import { useCallback, useState } from "react";
import {
  CheckCircle,
  ChevronDownCircle,
  ChevronUpCircle,
  XCircle,
} from "lucide-react";

import { Button } from "../button";
import { Card, CardContent } from "../card";

interface QuizItem {
  id: string;
  content: string;
}

export interface SortableQuizListProps {
  items: QuizItem[];
  correctOrder: string[];
  onReorder: (newItems: QuizItem[]) => void;
}

export function Sortable({
  items: initialItems,
  correctOrder,
  onReorder,
}: SortableQuizListProps) {
  const [items, setItems] = useState(initialItems);
  const [checkedAnswers, setCheckedAnswers] = useState<boolean[]>([]);

  const moveItem = useCallback(
    (index: number, direction: -1 | 1) => {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= items.length) return;

      const newItems = [...items];
      const [movedItem] = newItems.splice(index, 1);
      newItems.splice(newIndex, 0, movedItem);

      setItems(newItems);
      onReorder(newItems);
      setCheckedAnswers([]); // Reset answers on reorder
    },
    [items, onReorder],
  );

  const checkAnswers = useCallback(() => {
    const currentOrder = items.map((item) => item.id);
    const newCheckedAnswers = currentOrder.map(
      (id, index) => id === correctOrder[index],
    );
    setCheckedAnswers(newCheckedAnswers);
  }, [items, correctOrder]);

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={item.id} role="listitem" aria-label={`Item ${index + 1}`}>
            <Card>
              <CardContent className="flex items-center space-x-4 p-4">
                <span className="flex-grow">{item.content}</span>
                <Button
                  onClick={() => moveItem(index, -1)}
                  disabled={index === 0}
                  aria-label="Move up"
                  variant="ghost"
                >
                  <ChevronUpCircle
                    className={index === 0 ? "text-gray-400" : ""}
                  />
                </Button>
                <Button
                  onClick={() => moveItem(index, 1)}
                  disabled={index === items.length - 1}
                  aria-label="Move down"
                  variant="ghost"
                >
                  <ChevronDownCircle
                    className={
                      index === items.length - 1 ? "text-gray-400" : ""
                    }
                  />
                </Button>
                {checkedAnswers[index] !== undefined && (
                  <span
                    className={
                      checkedAnswers[index] ? "text-green-500" : "text-red-500"
                    }
                  >
                    {checkedAnswers[index] ? <CheckCircle /> : <XCircle />}
                  </span>
                )}
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      <Button onClick={checkAnswers} className="w-full">
        <CheckCircle className="mr-2" /> Check Answers
      </Button>
    </div>
  );
}
