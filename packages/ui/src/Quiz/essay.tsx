import React from "react";

import type { Question } from "./quiz";
import { Label } from "../label";
import { Textarea } from "../textarea";

interface EssayQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
  answer: string;
}

export default function EssayQuestion({
  question,
  onAnswer,
  answer,
}: EssayQuestionProps) {
  return (
    <div>
      <Label htmlFor={question.id} className="mb-2 text-lg font-medium">
        {question.question}
      </Label>
      <Textarea
        id={question.id}
        value={answer || ""}
        onChange={(e) => onAnswer(e.target.value)}
        placeholder="Type your answer here..."
        className="mt-2"
      />
    </div>
  );
}
