import { useEffect, useState } from "react";

import type { Question } from "./quiz";
import { Label } from "../label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

interface QuizMatrixSortQuestionProps {
  question: Question;
  onAnswer: (answer: { [key: string]: string[] }) => void;
  answer: { [key: string]: string[] };
}

export function QuizMatrixSortQuestionComponent({
  question,
  onAnswer,
  answer,
}: QuizMatrixSortQuestionProps) {
  const [columns, setColumns] = useState(
    answer || (question as any).matrixData || {},
  );

  // Update parent component whenever columns change
  useEffect(() => {
    onAnswer(columns);
  }, [columns, onAnswer]);

  const handleSelectChange = (item: string, targetColumn: string) => {
    const newColumns: { [key: string]: string[] } = {};
    Object.entries(columns).forEach(([columnId, items]) => {
      newColumns[columnId] = items.filter((i) => i !== item);
    });
    newColumns[targetColumn] = [...(newColumns[targetColumn] || []), item];
    setColumns(newColumns);
  };

  return (
    <div>
      <Label className="mb-4 text-lg font-medium">{question.question}</Label>
      <div className="space-y-4">
        {Object.entries(columns).flatMap(([_columnId, items]) => (
          <div key={_columnId}>
            {items.map((item) => (
              <div key={item} className="flex items-center space-x-4">
                <span>{item}</span>
                <Select
                  value={
                    Object.entries(columns).find(([_, items]) =>
                      items.includes(item),
                    )?.[0]
                  }
                  onValueChange={(value) => handleSelectChange(item, value)}
                >
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Select Column" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(columns).map((colId) => (
                      <SelectItem key={colId} value={colId}>
                        {colId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
