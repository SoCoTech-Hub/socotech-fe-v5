import React from "react";

import type { Question } from "./quiz";
import { Label } from "../label";
import { RadioGroup, RadioGroupItem } from "../radio-group";

interface SingleChoiceQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
  answer: string;
}

export default function SingleChoiceQuestion({
  question,
  onAnswer,
  answer,
}: SingleChoiceQuestionProps) {
  return (
    <div>
      <Label className="mb-4 text-lg font-medium">{question.question}</Label>
      <RadioGroup onValueChange={onAnswer} value={answer}>
        {question.options?.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`${question.id}-${option}`} />
            <Label htmlFor={`${question.id}-${option}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
