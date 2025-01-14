import type { Question } from "./quiz";
import { Input } from "../input";
import { Label } from "../label";

interface FreeChoiceQuestionProps {
  question: Question;
  onAnswer: (answer: string) => void;
  answer: string;
}

export function FreeChoiceQuestionComponent({
  question,
  onAnswer,
  answer,
}: FreeChoiceQuestionProps) {
  return (
    <div>
      <Label htmlFor={question.id} className="mb-2 text-lg font-medium">
        {question.question}
      </Label>
      <Input
        id={question.id}
        value={answer || ""}
        onChange={(e) => onAnswer(e.target.value)}
        placeholder="Enter your answer"
        className="mt-2"
      />
    </div>
  );
}
